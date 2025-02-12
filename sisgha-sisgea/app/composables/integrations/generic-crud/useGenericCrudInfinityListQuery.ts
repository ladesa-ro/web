import { useInfiniteQuery } from '@tanstack/vue-query';
import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypesBase } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypesBase';
import { useGenericCrudFindOneAheadOfTime } from './useGenericCrudFindOneAheadOfTime';

export const useGenericCrudInfinityListQuery = <
  Types extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Types>,
>(
  crudModule: CrudModule
) => {
  type SearchOptions = Types['List']['Queries'];

  return (searchOptions: MaybeRef<SearchOptions>) => {
    const queryKey = computed(() => [
      ...crudModule.baseQueryKeys,
      JSON.stringify(unref(searchOptions)),
    ]);

    const query = useInfiniteQuery({
      initialPageParam: 1,

      queryKey: queryKey,

      queryFn: async ({ pageParam }) => {
        const data = unref(searchOptions);

        const response = await crudModule.list({
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
      return unref(query.isLoading);
    });

    const isFetching = query.isFetching;

    //
    const data = query.data;
    //

    const items = computed(() => {
      const dataRaw = unref(data);

      const pages = dataRaw?.pages;

      if (!pages) return null;

      const pagesDatas = pages.map((page) => page.data);
      return pagesDatas.flat();
    });

    useGenericCrudFindOneAheadOfTime(crudModule, items);

    const suspense = useQuerySuspend(query);

    const lastPage = computed(() => {
      const pages = query.data.value?.pages ?? [];
      return pages[pages.length - 1] ?? null;
    });

    const paginationMeta = computed(() => {
      const lastPageMeta = lastPage.value?.meta;

      return {
        totalItems: lastPageMeta?.totalItems ?? 0,
        currentPage: lastPageMeta?.currentPage ?? 0,
        totalPages: lastPageMeta?.totalPages ?? 0,
      };
    });

    return {
      suspense,
      query,

      data,

      items,

      status: {
        isFetching,
        isLoading,
      },

      paginationMeta,
    };
  };
};
