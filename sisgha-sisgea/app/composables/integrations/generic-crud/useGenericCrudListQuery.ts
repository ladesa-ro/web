import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { type QuerySuspenseBehaviour } from '../../../utils';
import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';

export const useGenericCrudListQuery = <Types extends IGenericCrudModuleTypes>(
  crudModule: IGenericCrudModule<Types>
) => {
  type SearchOptions = Types['List']['Queries'];
  type PaginatedItem = Types['GetOne']['Result'];

  return (input: MaybeRef<SearchOptions>) => {
    const queryKey = computed(() => [
      ...crudModule.baseQueryKeys,
      JSON.stringify(unref(input)),
    ]);

    const query = useQuery({
      queryKey: queryKey,

      queryFn: async () => {
        const inputUnwrapped = unref(input);
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
        if (currentItems) {
          previousItems.value = currentItems;
        }
      },
      { immediate: true }
    );

    const suspense = (suspenseBehaviour?: QuerySuspenseBehaviour) => {
      return QuerySuspense(
        query,
        suspenseBehaviour ?? { mode: QuerySuspenseBehaviourMode.ALWAYS_WAIT }
      );
    };

    return {
      suspense,

      query,

      items,
      paginatedResponse,
      previousItems,

      isLoading,
    };
  };
};
