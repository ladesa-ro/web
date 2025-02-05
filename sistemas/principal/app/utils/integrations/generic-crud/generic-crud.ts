import type { IGenericCrudModule } from './IGenericCrudModule';
import type { IGenericCrudModuleTypes } from './IGenericCrudModuleTypes';

export const createCrudModule = <Typings extends IGenericCrudModuleTypes>(
  crudModule: IGenericCrudModule<Typings>
) => crudModule;
