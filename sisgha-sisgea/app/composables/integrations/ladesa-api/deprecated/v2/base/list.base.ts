import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';
import { debouncedRef } from '@vueuse/core';
import type { MaybePromise } from '../../../../../../typings';
import type {
  IApiCoreListInput,
  IApiCoreListOutput,
} from '../../../../../../utils/integrations/api/core/typings';

export type IGenericListItem = {
  id: string | number;
};

export type IApiBaseResourceListRetriever<
  ListRetrieverResultItemDto = IGenericListItem,
  SearchInputDto extends IApiCoreListInput = IApiCoreListInput,
> = (
  data: SearchInputDto
) => MaybePromise<IApiCoreListOutput<ListRetrieverResultItemDto>>;

/**
 * @deprecated
 */
export const useApiBaseResourceInfinityList = async <ResultItemDto = unknown>(
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>,

  apiResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>,

  apiResourceListRetrieverInputDto: MaybeRef<IApiCoreListInput>,

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

  const queryKey = [...baseQueryKeys, inputDtoStringRef].filter(
    (i) => i !== undefined
  );

  const queryKeyDebounced = [...baseQueryKeys, debouncedInputDtoString].filter(
    (i) => i !== undefined
  );

  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    initialPageParam: 1,

    queryKey: queryKeyDebounced,

    queryFn: async ({ pageParam }) => {
      const data = unref(apiResourceListRetrieverInputDto);

      const response = await apiResourceListRetriever({
        ...data,
        page: pageParam,
      });

      return response ?? null;
    },

    getPreviousPageParam: (lastPage) => {
      if (lastPage) {
        const currentPage = lastPage.meta.currentPage;
        const totalPages = lastPage.meta.totalPages;

        if (totalPages > 0 && currentPage > 0 && currentPage > 1) {
          return currentPage - 1;
        }
      }

      return null;
    },

    getNextPageParam: (lastPage) => {
      if (lastPage) {
        const currentPage = lastPage.meta.currentPage;
        const totalPages = lastPage.meta.totalPages;

        if (totalPages > 0 && currentPage > 0 && currentPage < totalPages) {
          return currentPage + 1;
        }
      }

      return null;
    },
  });

  //

  const isLoading = computed(() => {
    const checkDebouncedLoading = () => {
      const hasNextInCache = queryClient
        .getQueryCache()
        .find({ queryKey: queryKey });

      return hasNextInCache
        ? false
        : debouncedInputDtoString.value !== inputDtoStringRef.value;
    };

    return query.isLoading.value || checkDebouncedLoading();
  });

  //
  const data = computed(() => unref(query.data));

  //

  const items = computed(
    () =>
      unref(data)
        ?.pages?.map((i) => i.data)
        ?.flat() ?? null
  );

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
    {
      immediate: true,
    }
  );

  //

  return {
    //
    data,
    query,
    //
    items,
    previousItems,
    //
    isLoading,
  };
};

/**
 * @deprecated
 */
export const useApiBaseResourceList = async <ResultItemDto = unknown>(
  baseQueryKey: MaybeRef<any>[] | MaybeRef<any>,

  apiResourceListRetriever: IApiBaseResourceListRetriever<ResultItemDto>,

  apiResourceListRetrieverInputDto: MaybeRef<IApiCoreListInput>,

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

  const isLoading = computed(
    () =>
      query.isLoading.value ||
      debouncedInputDtoString.value !== inputDtoStringRef.value
  );

  //
  const paginatedResponse = computed(() => unref(query.data));
  //

  const items = computed(() => unref(paginatedResponse)?.data ?? null);
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
    paginatedResponse,
    previousItems,
    //
    isLoading,
  };
};
