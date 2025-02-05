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

  return async (
    input: MaybeRef<SearchOptions>,
    suspenseBehaviour?: QuerySuspenseBehaviour
  ) => {
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

    //

    const isLoading = query.isLoading;

    //

    const paginatedResponse = query.data;

    const items = computed(() => unref(paginatedResponse)?.data ?? null);
    const previousItems = ref(unref(items)) as Ref<PaginatedItem[] | null>;

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

    await QuerySuspense(
      query,
      suspenseBehaviour ?? { mode: QuerySuspenseBehaviourMode.ALWAYS_WAIT }
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
};
