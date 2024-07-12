import { useQuery } from '@tanstack/vue-query';
import { refDebounced } from '@vueuse/core';
import {
  QuerySuspense,
  type QuerySuspenseBehaviour,
} from '../../-utils/QuerySuspense';
import type { IBaseApiSearchFn, IBaseApiSearchInput } from './typings';

export const useBaseApiSearch = async <ResultItemDto = unknown>(
  baseKey: MaybeRef<any>[],

  fn: IBaseApiSearchFn<ResultItemDto>,
  data: MaybeRef<IBaseApiSearchInput>,

  suspenseBehaviour?: QuerySuspenseBehaviour,

  debounceTimeout = 200
) => {
  const queryKey = [...baseKey, computed(() => JSON.stringify(unref(data)))];

  const query = useQuery({
    queryKey: queryKey,

    queryFn: async () => {
      const dataRaw = unref(data);
      return fn({ ...dataRaw });
    },
  });

  //

  const responseData = computed(() => unref(query.data));

  //

  const items = computed(() => unref(responseData)?.data ?? []);

  const previousItems = ref<ResultItemDto[]>([]) as Ref<ResultItemDto[]>;

  watch(
    [items, query.isLoading],
    ([currentItems, isLoading]) => {
      if (!isLoading) {
        previousItems.value = currentItems;
      }
    },
    { immediate: true }
  );

  const paginatedDataDebounced = refDebounced(items, debounceTimeout);

  //

  await QuerySuspense(query, suspenseBehaviour);

  //

  return {
    //
    query,
    //
    items,
    paginatedDataDebounced,
    previousItems,
    //
  };
};
