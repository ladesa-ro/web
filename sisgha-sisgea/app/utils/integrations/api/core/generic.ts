import type { LadesaApiClient } from '@ladesa-ro/api-client-fetch';
import type { IGenericCrudModule } from '../../generic-crud/IGenericCrudModule';
import { type IGenericCrudModuleTypes } from '../../generic-crud/IGenericCrudModuleTypes';

export type ILadesaApiCrudModuleFactory<
  Typings extends IGenericCrudModuleTypes,
  CrudModule extends IGenericCrudModule<Typings>,
> = (apiClient: LadesaApiClient) => CrudModule;

/**
 * @deprecated
 */
export const createLadesaApiClientCrudModule = <
  Typings extends IGenericCrudModuleTypes,
  CrudModule extends IGenericCrudModule<Typings> = IGenericCrudModule<Typings>,
>(
  factory: ILadesaApiCrudModuleFactory<Typings, CrudModule>
) => factory;

export const withApiClient = <T>(
  factory: (apiClient: LadesaApiClient) => T
) => {
  return factory;
};
