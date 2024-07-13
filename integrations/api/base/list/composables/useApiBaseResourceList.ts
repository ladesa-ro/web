import { useQuery } from '@tanstack/vue-query';
import { debouncedRef } from '@vueuse/core';
import {
  QuerySuspense,
  type QuerySuspenseBehaviour,
} from '../../../../-utils/QuerySuspense';
import type {
  IApiBaseResourceListRetriever,
  IApiBaseResourceListRetrieverInput,
} from '../typings/typings';

export const useApiBaseResourceList = async <ResultItemDto = unknown>(
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>,

  apiResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>,

  apiResourceListRetrieverInputDto: MaybeRef<IApiBaseResourceListRetrieverInput>,

  suspenseBehaviour?: QuerySuspenseBehaviour
) => {
  const baseQueryKeys = Array.isArray(baseQueryKey)
    ? baseQueryKey
    : [baseQueryKey];

  const inputDtoRef = computed(() => unref(apiResourceListRetrieverInputDto));

  const inputDtoStringRef = computed(() => JSON.stringify(inputDtoRef.value));

  const debouncedInputDtoString = debouncedRef(inputDtoStringRef, 100, {
    rejectOnCancel: true,
  });

  const queryKey = [...baseQueryKeys, debouncedInputDtoString];

  const query = useQuery({
    queryKey: queryKey.filter((i) => i !== undefined),

    queryFn: async () => {
      const data = unref(apiResourceListRetrieverInputDto);
      const response = await apiResourceListRetriever({ ...data });
      return response ?? null;
    },
  });

  //

  const isLoading =
    query.isLoading ||
    debouncedInputDtoString.value !== inputDtoStringRef.value;

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
