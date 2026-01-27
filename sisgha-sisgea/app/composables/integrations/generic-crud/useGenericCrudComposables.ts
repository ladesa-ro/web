import type { IGenericCrudModule } from '../../../utils/integrations/generic-crud/IGenericCrudModule';
import type { IGenericCrudModuleTypesBase } from '../../../utils/integrations/generic-crud/IGenericCrudModuleTypesBase';
import { useGenericCrudDelete } from './useGenericCrudDelete';
import { useGenericCrudFindOneQuery } from './useGenericCrudFindOneQuery';
import { useGenericCrudInfinityListQuery } from './useGenericCrudInfinityListQuery';
import { useGenericCrudListQuery } from './useGenericCrudListQuery';

export const useGenericCrudComposables = <
  Types extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Types>,
>(
  crudModule: CrudModule
) => {
  return {
    useList(data: Types['List']['Queries']) {
      const contextCampi = useCampusContext();
      return crudModule.list(data, contextCampi);
    },

    useFindOne: crudModule.getOne,

    useListQuery: useGenericCrudListQuery(crudModule),
    useInfinityListQuery: useGenericCrudInfinityListQuery(crudModule),
    useFindOneQuery: useGenericCrudFindOneQuery(crudModule),

    useDeleteMutation: useGenericCrudDelete(crudModule),
  };
};
