import type {
  IGenericCrudModule,
  IGenericCrudModuleTypesBase,
} from '../../../../utils';

export function getQueryKeyForCrudModuleFindOne<
  Types extends IGenericCrudModuleTypesBase,
>(
  crudModule: IGenericCrudModule<Types>,
  id: MaybeRef<Types['CompleteView']['id'] | null>
) {
  return computed(() => [...crudModule.baseQueryKeys, { id: unref(id) }]);
}

export function getQueryKeyForCrudModuleQueryState<
  Types extends IGenericCrudModuleTypesBase,
>(
  crudModule: IGenericCrudModule<Types>,
  id: MaybeRef<Types['CompleteView']['id'] | null>
) {
  return computed(() => [
    ...getQueryKeyForCrudModuleFindOne(crudModule, id).value,
    'form-state',
  ]);
}

export function getQueryKeyForCrudModuleList<
  Types extends IGenericCrudModuleTypesBase,
>(
  crudModule: IGenericCrudModule<Types>,
  searchOptions: MaybeRef<Types['List']['Queries']>
) {
  return computed(() => [
    ...crudModule.baseQueryKeys,
    'queries@list',
    JSON.stringify(unref(searchOptions)),
  ]);
}
