import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { useGenericCrudDelete } from './useGenericCrudDelete';
import { useGenericCrudFindOneQuery } from './useGenericCrudFindOneQuery';
import { useGenericCrudListQuery } from './useGenericCrudListQuery';

export const useGenericCrudComposables = <
  Types extends IGenericCrudModuleTypes,
  CrudModule extends IGenericCrudModule<Types>,
>(
  crudModule: CrudModule
) => {
  return {
    useList: crudModule.list,
    useFindOne: crudModule.getOne,

    useListQuery: useGenericCrudListQuery(crudModule),
    useFindOneQuery: useGenericCrudFindOneQuery(crudModule),

    useDeleteMutation: useGenericCrudDelete(crudModule),
  };
};
