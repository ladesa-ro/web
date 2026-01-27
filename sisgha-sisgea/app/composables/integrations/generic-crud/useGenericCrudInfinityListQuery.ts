import { useInfiniteQuery } from '@tanstack/vue-query';
import { getQueryKeyForCrudModuleList } from '~/composables/integrations/generic-crud/utils/get-query-key';
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
    const contextCampi = useCampusContext();

    const queryKey = getQueryKeyForCrudModuleList(crudModule, searchOptions);

    const query = useInfiniteQuery({
      initialPageParam: 1,

      queryKey: [queryKey, contextCampi],

      queryFn: async ({ pageParam }) => {
        const data = unref(searchOptions);

        const response = await crudModule.list(
          {
            ...data,
            page: pageParam,
          },
          contextCampi
        );

        return response ?? null;
      },

      getPreviousPageParam: lastPage => {
        if (lastPage) {
          const currentPage = lastPage.meta.currentPage;
          const totalPages = lastPage.meta.totalPages;

          if (totalPages > 0 && currentPage > 0 && currentPage > 1) {
            return currentPage - 1;
          }
        }

        return null;
      },

      getNextPageParam: lastPage => {
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

    const pages = computed(() => {
      const dataRaw = unref(data);
      const pages = dataRaw?.pages;

      if (pages) {
        return pages.sort((a, b) => a.meta.currentPage - b.meta.currentPage);
      }

      return null;
    });
    //

    const items = computed(() => {
      const pagesValue = unref(pages);

      if (!pagesValue) return null;

      const pagesDatas = pagesValue.map(page => page.data);
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
