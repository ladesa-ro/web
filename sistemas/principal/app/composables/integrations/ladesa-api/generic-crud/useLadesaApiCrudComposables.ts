import type { ILadesaApiCrudModuleFactory } from '../../../../utils/integrations/api/core/generic';
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

  const crudModule = useCrudModule();

  return {
    crudModule,
    composables: useGenericCrudComposables(crudModule),
  };
};
