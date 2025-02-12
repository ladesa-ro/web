import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
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
    const queryKey = computed(() => [
      ...crudModule.baseQueryKeys,
      JSON.stringify(unref(searchOptions)),
    ]);

    const query = useQuery({
      queryKey: queryKey,

      queryFn: async () => {
        const inputUnwrapped = unref(searchOptions);
        return crudModule.list(inputUnwrapped);
      },
    });

    const isLoading = query.isLoading;

    const paginatedResponse = query.data;

    const items = computed(
      () => unref(paginatedResponse)?.data ?? null
    ) as ComputedRef<PaginatedItem[] | null>;

    const previousItems = ref(unref(items)) as Ref<PaginatedItem[] | null>;

    watch(
      [items],
      ([currentItems]) => {
        if (!currentItems) return;
        previousItems.value = currentItems;
      },
      { immediate: true }
    );

    const suspend = useQuerySuspend(query);

    useGenericCrudFindOneAheadOfTime(crudModule, items);

    return {
      suspend,

      query,

      items,
      paginatedResponse,
      previousItems,

      isLoading,
    };
  };
};
