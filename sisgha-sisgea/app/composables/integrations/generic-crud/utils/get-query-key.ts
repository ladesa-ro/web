import type {
  IGenericCrudModule,
  IGenericCrudModuleTypes,
} from '../../../../utils';

export function getQueryKeyForCrudModuleFindOne<
  Types extends IGenericCrudModuleTypes,
>(
  crudModule: IGenericCrudModule<Types>,
  id: MaybeRef<Types['CompleteView']['id'] | null>
) {
  return computed(() => [...crudModule.baseQueryKeys, { id: unref(id) }]);
}

export function getQueryKeyForCrudModuleQueryState<
  Types extends IGenericCrudModuleTypes,
>(
  crudModule: IGenericCrudModule<Types>,
  id: MaybeRef<Types['CompleteView']['id'] | null>
) {
  return computed(() => [
    ...getQueryKeyForCrudModuleFindOne(crudModule, id).value,
    'form-state',
  ]);
}
