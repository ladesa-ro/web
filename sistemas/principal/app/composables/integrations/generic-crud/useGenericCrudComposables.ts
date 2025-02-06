import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypes } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { useGenericCrudFindOneQuery } from './useGenericCrudFindOneQuery';
import { useGenericCrudListQuery } from './useGenericCrudListQuery';

export const useGenericCrudComposables = <
  Types extends IGenericCrudModuleTypes,
>(
  crudModule: IGenericCrudModule<Types>
) => {
  return {
    useList: crudModule.list,
    useGetOne: crudModule.getOne,

    useListQuery: useGenericCrudListQuery(crudModule),
    useFindOneQuery: useGenericCrudFindOneQuery(crudModule),
  };
};
