import { useQuery } from '@tanstack/vue-query';
import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypesBase } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypesBase';
import { getQueryKeyForCrudModuleFindOne } from './utils/get-query-key';

export const useGenericCrudFindOneQuery = <
  Types extends IGenericCrudModuleTypesBase,
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

    const suspense = useQuerySuspend(query);

    //

    return {
      query,

      suspense,

      state: {
        isLoading,
        queryKey,
      },

      data,
    };
  };
};
