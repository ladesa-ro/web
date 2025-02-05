import type { LadesaApiClient } from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud/IGenericCrudModule';
import { type IGenericCrudModuleTypes } from '../../generic-crud/IGenericCrudModuleTypes';

export type ILadesaApiCrudModuleFactory<Typings extends IGenericCrudModuleTypes> = (apiClient: LadesaApiClient) => IGenericCrudModule<Typings>;

export const createLadesaApiClientCrudModule = <
  Typings extends IGenericCrudModuleTypes,
>(
  factory: ILadesaApiCrudModuleFactory<Typings>
) => {
  return factory;
};
