import { useQueryClient } from '@tanstack/vue-query';
import difference from 'lodash/difference';
import map from 'lodash/map';
import Mutex from 'p-mutex';
import PQueue from 'p-queue';
import { getQueryKeyForCrudModuleFindOne } from './utils/get-query-key';

export const useGenericCrudFindOneAheadOfTime = <
  Types extends IGenericCrudModuleTypesBase,
>(
  crudModule: IGenericCrudModule<Types>,
  items: MaybeRef<Types['List']['ResultItem'][] | null>
) => {
  const itemsRef = toRef(items);

  const queryClient = useQueryClient();

  const queue = new PQueue({ concurrency: 3 });

  const mutex = new Mutex();

  const jobsMeta = new Map<string, { abortController: AbortController }>();

  const addItemsToFetchQueue = (ids: Types['GetOne']['Result']['id'][]) => {
    for (const id of ids) {
      const queryKey = getQueryKeyForCrudModuleFindOne(crudModule, id);

      mutex.withLock(async () => {
        if (jobsMeta.has(id)) return;

        const abortController = new AbortController();

        queue.add(
          async ({ signal }) => {
            if (signal) {
              signal.addEventListener('abort', () => {
                const count = queryClient.isFetching({ queryKey });

                if (count === 0) {
                  queryClient.cancelQueries({ queryKey: queryKey.value });
                }
              });
            }

            try {
              const data = await queryClient.ensureQueryData({
                queryKey,
                queryFn: () => crudModule.getOne(id),
              });

              queryClient.setQueryData(queryKey, data);
            } catch {
              queryClient.removeQueries({ queryKey: queryKey.value });
            }
          },
          { signal: abortController.signal }
        );

        jobsMeta.set(id, { abortController });
      });
    }
  };

  const removeItemsFromFetchQueue = (
    ids: Types['GetOne']['Result']['id'][]
  ) => {
    for (const id of ids) {
      mutex.withLock(async () => {
        const jobMeta = jobsMeta.get(id);

        if (!jobMeta) return;

        jobMeta.abortController.abort();

        jobsMeta.delete(id);
      });
    }
  };

  watch(
    [itemsRef],
    ([currentItems], [previousItems]) => {
      if (!currentItems) return;

      const currentIds = map(currentItems ?? [], 'id');

      addItemsToFetchQueue(currentIds);

      const previousIds = map(previousItems ?? [], 'id');

      const removed = difference(previousIds, currentIds);

      removeItemsFromFetchQueue(removed);
    },
    { immediate: true }
  );

  return {};
};
