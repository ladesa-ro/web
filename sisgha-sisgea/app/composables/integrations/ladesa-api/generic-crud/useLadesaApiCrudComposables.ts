import type { LadesaApiClient } from '@ladesa-ro/api-client-fetch';
import { useGenericCrudComposables } from '../../generic-crud';

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
