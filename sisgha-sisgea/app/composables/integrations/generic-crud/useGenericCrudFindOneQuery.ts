import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import {
  QuerySuspenseBehaviourMode,
  type QuerySuspenseBehaviour,
} from '../../../utils';
import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { getQueryKeyForCrudModuleFindOne } from './utils/get-query-key';

export const useGenericCrudFindOneQuery = <
  Types extends IGenericCrudModuleTypes,
>(
  crudModule: IGenericCrudModule<Types>
) => {
  type Id = Types['CompleteView']['id'];
  type InputId = MaybeRef<Id | null>;
  type GetOneResult = Types['GetOne']['Result'];

  return (id: InputId) => {
    const queryKey = getQueryKeyForCrudModuleFindOne<Types>(crudModule, id);

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
    const suspense = (suspenseBehaviour?: QuerySuspenseBehaviour) => {
      return QuerySuspense(
        query,
        suspenseBehaviour ?? { mode: QuerySuspenseBehaviourMode.ALWAYS_WAIT }
      );
    };
    //

    return {
      query,

      suspense,

      state: {
        isLoading,
        queryKey,
      },

      data,
      previousData,
    };
  };
};
