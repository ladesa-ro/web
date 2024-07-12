import { useQuery } from '@tanstack/vue-query';
import { useDebounceFn } from '@vueuse/core';
import {
  QuerySuspense,
  type QuerySuspenseBehaviour,
} from '../../-utils/QuerySuspense';
import type { IBaseApiSearchFn, IBaseApiSearchInput } from './typings';

export const useBaseApiSearch = async <ResultItemDto = unknown>(
  baseKey: MaybeRef<any>[],

  fn: IBaseApiSearchFn<ResultItemDto>,
  inputDto: MaybeRef<IBaseApiSearchInput>,

  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const inputDtoAsRef = computed(() => unref(inputDto));

  const queryKey = [
    ...baseKey,
    computed(() => JSON.stringify(inputDtoAsRef.value)),
  ].filter(Boolean);

  const debouncedFn = useDebounceFn(fn, 200);

  const query = useQuery({
    queryKey: queryKey,

    queryFn: async () => {
      const inputDtoRaw = unref(inputDto);

      const response = await debouncedFn({ ...inputDtoRaw });
      return response ?? null;
    },
  });

  //

  const isLoading = computed(() => {
    return query.isLoading.value;
  });

  //

  const responseData = computed(() => unref(query.data));

  //

  const items = computed(() => unref(responseData)?.data ?? null);

  const previousItems = ref(unref(items)) as Ref<ResultItemDto[]>;

  //

  await QuerySuspense(query, suspenseBehaviour);

  //

  watch(
    [items],
    ([currentItems]) => {
      if (currentItems) {
        previousItems.value = currentItems;
      }
    },
    { immediate: true }
  );

  //

  return {
    //
    query,
    //
    items,
    previousItems,
    //
    isLoading,
  };
};
