import type { LadesaApiClient } from '~/helpers/api-client';
import {
  type IGenericCrudModule,
  type IGenericCrudModuleTypesBase,
} from '../../../../utils';
import { useGenericCrudComposables } from '../../generic-crud';
import { useApiClient } from '../useApiClient';

export const useLadesaApiCrudComposables = <
  Types extends IGenericCrudModuleTypesBase,
  CrudModule extends IGenericCrudModule<Types>,
>(
  crudModuleFactory: (apiClient: LadesaApiClient) => CrudModule
) => {
  const useCrudModule = () => {
    const apiClient = useApiClient();
    const crudModule = crudModuleFactory(apiClient);
    return crudModule;
  };

  const crudModule = useCrudModule();

  return {
    crudModule,
    composables: useGenericCrudComposables<Types, CrudModule>(crudModule),
  };
};
