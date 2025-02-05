import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { useGenericCrudFindOneQuery } from './useGenericCrudFindOneQuery';

export const useGenericCrudComposables = <
  Types extends IGenericCrudModuleTypes,
>(
  useCrudModule: () => IGenericCrudModule<Types>
) => {
  return {
    useCrudModule,

    useFindOneQuery: () => {
      return useGenericCrudFindOneQuery(useCrudModule());
    },

    useList: () => {
      const crudModule = useCrudModule();
      return crudModule.list;
    },

    useGetOne: () => {
      const crudModule = useCrudModule();
      return crudModule.getOne;
    },
  };
};
