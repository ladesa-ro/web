import type { ILadesaApiCrudModuleFactory } from '../../../../utils/integrations/api/generic';
import type { IGenericCrudModuleTypes } from '../../../../utils/integrations/generic-crud/IGenericCrudModuleTypes';
import { useGenericCrudComposables } from '../../generic-crud';

export const useLadesaApiCrudComposables = <
  Typings extends IGenericCrudModuleTypes,
>(
  factory: ILadesaApiCrudModuleFactory<Typings>
) => {
  const useCrudModule = () => {
    const apiClient = useApiClient();
    const crudModule = factory(apiClient);
    return crudModule;
  };

  return {
    crudModule: useCrudModule(),
    composables: useGenericCrudComposables(useCrudModule),
  };
};
