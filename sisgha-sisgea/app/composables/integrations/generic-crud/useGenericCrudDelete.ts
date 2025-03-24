import {
  type InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/vue-query';
import type { MaybePromise } from 'vee-validate';
import type {
  IGenericCrudModule,
  IGenericCrudModuleTypesBase,
} from '../../../utils';

export type IGenericCrudDeleteOptions<
  Typings extends IGenericCrudModuleTypesBase,
> = {
  invalidators?: {
    filter: InvalidateQueryFilters;
  }[];

  afterSuccess?: (id: Typings['CompleteView']['id']) => MaybePromise<void>;

  canDeleteCheck?: (id: Typings['CompleteView']['id']) => MaybePromise<boolean>;
};

export const useGenericCrudDelete = <
  Typings extends IGenericCrudModuleTypesBase,
>(
  crudModule: IGenericCrudModule<Typings>
) => {
  return (options: IGenericCrudDeleteOptions<Typings>) => {
    type Id = Typings['CompleteView']['id'];

    const { canDeleteCheck, afterSuccess, invalidators } = options;

    //

    const queryClient = useQueryClient();

    const executor = crudModule.deleteOne;

    const handleDeleteBase = async (id: Id) => {
      if (canDeleteCheck) {
        const canDelete = await canDeleteCheck(id);

        if (!canDelete) {
          return;
        }
      }

      const executorFn = unref(executor);

      if (!executorFn) {
        throw new TypeError(`Please provide a valid executor.`);
      }

      await executorFn(id);

      await queryClient.invalidateQueries({
        queryKey: crudModule.baseQueryKeys,
      });

      if (invalidators) {
        for (const invalidator of invalidators) {
          await queryClient.invalidateQueries(invalidator.filter);
        }
      }

      if (afterSuccess) {
        await afterSuccess(id);
      }
    };

    const query = useMutation({
      mutationKey: ['actions@delete', ...crudModule.baseQueryKeys],
      mutationFn: handleDeleteBase,
    });

    const { mutateAsync: handleDelete } = query;

    return {
      query,
      handleDelete,
      handleDeleteBase,
    };
  };
};
