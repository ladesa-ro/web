import { useQuery } from '@tanstack/vue-query';
import { getQueryKeyForCrudModuleList } from '~/composables/integrations/generic-crud/utils/get-query-key';
import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypesBase } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypesBase';
import { useGenericCrudFindOneAheadOfTime } from './useGenericCrudFindOneAheadOfTime';

export const useGenericCrudListQuery = <
  Types extends IGenericCrudModuleTypesBase,
>(
  crudModule: IGenericCrudModule<Types>
) => {
  type SearchOptions = Types['List']['Queries'];
  type PaginatedItem = Types['List']['ResultItem'];

  return (searchOptions: MaybeRef<SearchOptions>) => {
    const contextCampi = useCampusContext();

    const queryKey = getQueryKeyForCrudModuleList(crudModule, searchOptions);

    const query = useQuery({
      queryKey: [queryKey, contextCampi],

      queryFn: async () => {
        const searchOptionsValue = unref(searchOptions);
        return crudModule.list(searchOptionsValue, contextCampi);
      },
    });

    const isLoading = query.isLoading;

    const paginatedResponse = query.data;

    const items = computed(() => {
      const paginatedResponseValue = unref(paginatedResponse);

      const paginatedResponseData = paginatedResponseValue?.data;

      if (paginatedResponseValue) {
        return paginatedResponseData as PaginatedItem[];
      }

      return null;
    });

    useGenericCrudFindOneAheadOfTime(crudModule, items);

    const suspend = useQuerySuspend(query);

    return {
      query,

      data: {
        items,
        paginatedResponse,
      },

      queryStatus: {
        isLoading,
      },
      methods: {
        suspend,
      },
    };
  };
};
