import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import {
  QuerySuspenseBehaviourMode,
  type QuerySuspenseBehaviour,
} from '../../../utils';
import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';

export const useGenericCrudFindOneQuery = <
  Types extends IGenericCrudModuleTypes,
>(
  crudModule: IGenericCrudModule<Types>
) => {
  type Id = Types['CompleteView']['id'];
  type InputId = MaybeRef<Id>;
  type GetOneResult = Types['GetOne']['Result'];

  return async (id: InputId, suspenseBehaviour?: QuerySuspenseBehaviour) => {
    const queryKey = computed(() => [
      ...crudModule.baseQueryKeys,
      { id: unref(id) },
    ]);

    const query = useQuery({
      queryKey: queryKey,

      queryFn: async () => {
        const idUnwrapped = unref(id);

        if (idUnwrapped) {
          const data = await crudModule.getOne(idUnwrapped);
          return data ?? null;
        }

        return null;
      },
    });

    //

    const data = query.data;
    const isLoading = query.isLoading;

    //

    const previousData = ref(unref(data)) as Ref<GetOneResult | null>;

    //

    watch(
      [data],
      ([currentData]) => {
        if (currentData) {
          previousData.value = currentData;
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
      query,

      isLoading,

      data,
      previousData,
    };
  };
};
