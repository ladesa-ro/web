import {
  useMutation,
  useQueryClient,
  type InvalidateQueryFilters,
  type MutationKey,
} from '@tanstack/vue-query';
import type { Maybe } from 'yup';
import type { MaybePromise } from '../../../../../typings';
import type { IApiBaseResourceDeleteExecutor } from '../typings';

export type MaybeRefDeep<T> = MaybeRef<
  T extends Function
    ? T
    : T extends object
      ? {
          [Property in keyof T]: MaybeRefDeep<T[Property]>;
        }
      : T
>;

export type IUseApiBaseResourceDeleteOptions<
  Id = any,
  Extecutor extends
    IApiBaseResourceDeleteExecutor<Id> = IApiBaseResourceDeleteExecutor<Id>,
> = {
  executor: Maybe<Extecutor>;
  mutationKey: MaybeRefDeep<MutationKey | undefined>;

  invalidators: {
    filter: MaybeRefDeep<InvalidateQueryFilters>;
  }[];

  afterSuccess?: (id: Id) => MaybePromise<void>;

  canDeleteCheck?: (id: Id) => MaybePromise<boolean>;
};

export const useApiBaseResourceDelete = <
  Id = any,
  Extecutor extends
    IApiBaseResourceDeleteExecutor<Id> = IApiBaseResourceDeleteExecutor<Id>,
  ProvidedOptions extends IUseApiBaseResourceDeleteOptions<
    Id,
    Extecutor
  > = IUseApiBaseResourceDeleteOptions<Id, Extecutor>,
>(
  options: ProvidedOptions
) => {
  const { executor, mutationKey, canDeleteCheck, afterSuccess, invalidators } =
    options;

  //

  const queryClient = useQueryClient();

  const handleDeleteBase = async (id: Id) => {
    if (canDeleteCheck) {
      const canDelete = await canDeleteCheck(id);

      if (!canDelete) {
        return;
      }
    }

    const executorFn = unref(executor);

    if (!executorFn) {
      throw new TypeError(
        `Please provide a valid executor to ${useApiBaseResourceDelete.name}.`
      );
    }

    await executorFn(id);

    for (const invalidator of invalidators) {
      await queryClient.invalidateQueries(invalidator.filter);
    }

    if (afterSuccess) {
      await afterSuccess(id);
    }
  };

  const query = useMutation({
    mutationKey: mutationKey,
    mutationFn: handleDeleteBase,
  });

  const { mutateAsync: handleDelete } = query;

  return {
    query,
    handleDelete,
    handleDeleteBase,
  };
};
