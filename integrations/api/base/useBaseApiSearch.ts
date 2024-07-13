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

  const debouncedFn = useDebounceFn(fn, 100);

  const query = useQuery({
    queryKey: queryKey,

    queryFn: async () => {
      const inputDtoRaw = unref(inputDto);

      //

      const data = {
        ...inputDtoRaw,
        search: Boolean(inputDtoRaw.search) ? inputDtoRaw.search : undefined,
      };

      data.search = inputDtoRaw.search?.trim();

      if (typeof data.search !== 'string' || data.search.length === 0) {
        data.search = undefined;
      }

      //

      const response = await debouncedFn({ ...data });
      return response ?? null;
    },
  });

  //

  const isLoading = query.isLoading;

  //

  const responseData = computed(() => unref(query.data));

  //

  const items = computed(() => unref(responseData)?.data ?? null);

  const previousItems = ref(unref(items)) as Ref<ResultItemDto[] | null>;

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
