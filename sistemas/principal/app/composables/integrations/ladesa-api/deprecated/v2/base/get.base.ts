import { useQuery } from '@tanstack/vue-query';
import { castArray, filter } from 'lodash';
import type { MaybePromise, MaybeRefDeep } from '../../../../../../typings';

export type IUseApiBaseResourceGetRetrivever<
  Id = any,
  ResultItemDto = unknown,
> = (id: Id) => MaybePromise<ResultItemDto>;

type IUseApiBaseResourceGetOptions<Id = any, ResultItemDto = unknown> = {
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>;

  id: MaybeRef<Id | null | undefined>;
  apiResourceGetRetriever: IUseApiBaseResourceGetRetrivever<Id, ResultItemDto>;

  itemQueryKeyResolver?: (id: Id) => MaybeRefDeep<any>;
};

/**
 * @deprecated
 */
export const useApiBaseResourceGet = <
  Id = any,
  ResultItemDto = unknown,
  ProvidedOptions extends IUseApiBaseResourceGetOptions<
    Id,
    ResultItemDto
  > = IUseApiBaseResourceGetOptions<Id, ResultItemDto>,
>(
  options: ProvidedOptions
) => {
  const {
    id,
    baseQueryKey,
    apiResourceGetRetriever,
    itemQueryKeyResolver = (id) => JSON.stringify(unref(id)),
  } = options;

  const baseQueryKeys = castArray(baseQueryKey);

  const queryKey = computed(() => {
    const idRaw = unref(id);

    if (idRaw) {
      const itemQueryKeys = itemQueryKeyResolver(idRaw);
      return filter([...baseQueryKeys, ...itemQueryKeys], Boolean);
    }

    return [...baseQueryKeys, 'placeholder::@::ladesa::never'];
  });

  const query = useQuery({
    queryKey: queryKey,

    queryFn: async () => {
      const idRaw = unref(id);

      if (idRaw) {
        const response = await apiResourceGetRetriever(idRaw);
        return response ?? null;
      }

      return null;
    },
  });

  //

  const isLoading = computed(() => query.isLoading.value);

  //
  const response = computed(() => unref(query.data));
  const previousResponse = ref(unref(response)) as Ref<ResultItemDto | null>;

  //

  watch(
    [response],
    ([currentResponse]) => {
      if (currentResponse) {
        previousResponse.value = currentResponse;
      }
    },
    { immediate: true }
  );

  //

  return {
    //
    query,
    //
    response,
    previousResponse,
    //
    isLoading,
  };
};
