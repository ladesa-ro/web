import type { IGenericCrudModuleTypes } from './IGenericCrudModuleTypes';

export type IGenericCrudModule<
  Types extends IGenericCrudModuleTypes = IGenericCrudModuleTypes,
> = {
  baseQueryKeys: MaybeRef<string>[];

  create(
    requestBody: Types['Create']['Data']
  ): Promise<Types['Create']['Result']>;

  list(data: Types['List']['Queries']): Promise<Types['List']['Result']>;

  getOne(id: Types['CompleteView']['id']): Promise<Types['GetOne']['Result']>;

  updateOne(
    id: Types['CompleteView']['id'],
    requestBody: Types['Update']['Data']
  ): Promise<Types['Update']['Result']>;

  deleteOne(id: Types['CompleteView']['id']): Promise<any>;
};
