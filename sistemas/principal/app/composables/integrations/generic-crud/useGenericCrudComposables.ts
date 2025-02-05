import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { useGenericCrudFindOneQuery } from './useGenericCrudFindOneQuery';
import { useGenericCrudListQuery } from './useGenericCrudListQuery';

export const useGenericCrudComposables = <
  Types extends IGenericCrudModuleTypes,
>(
  useCrudModule: () => IGenericCrudModule<Types>
) => {
  return {
    useCrudModule,

    useList: () => {
      const crudModule = useCrudModule();
      return crudModule.list;
    },

    useListQuery: () => {
      return useGenericCrudListQuery(useCrudModule());
    },

    useGetOne: () => {
      const crudModule = useCrudModule();
      return crudModule.getOne;
    },

    useFindOneQuery: () => {
      return useGenericCrudFindOneQuery(useCrudModule());
    },
  };
};
