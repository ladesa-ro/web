import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import type { InvalidateFn } from '~/composables/query-helpers';
import { createCreateFn, createRemoveFn } from './-helpers/crudHelpers';
import {
  turmaMatriculaFindAll,
  turmaMatriculaVincular,
  turmaMatriculaDesvincularOneById,
} from '@ladesa-ro/web.api.client';
import type {
  TurmaMatriculaFindAllData,
  TurmaMatriculaListOutputDto,
  TurmaMatriculaVincularInputDto,
  TurmaMatriculaVincularResponse,
  ReqQuery,
} from '@ladesa-ro/web.api.client';

type ListFn = (
  params?: MaybeRef<ReqQuery<TurmaMatriculaFindAllData> | undefined>
) => UseQueryReturnType<TurmaMatriculaListOutputDto | null, Error>;

export type IUseTurmaMatricula = {
  keys: readonly string[];
  list: ListFn;
  create: (
    data: TurmaMatriculaVincularInputDto
  ) => Promise<TurmaMatriculaVincularResponse>;
  remove: (id: string) => Promise<unknown>;
  invalidate: InvalidateFn;
};

export const useTurmaMatricula = (): IUseTurmaMatricula => {
  const api = useApiClient();

  const keys = ['matriculas'] as const;

  const list: ListFn = params => {
    const queryKey = computed(() => [...keys, JSON.stringify(unref(params))]);

    return useQuery({
      queryKey,
      queryFn: () => api.call(turmaMatriculaFindAll, { query: unref(params) }),
      enabled: computed(() => unref(params) !== undefined),
    });
  };

  const create = createCreateFn<
    TurmaMatriculaVincularInputDto,
    TurmaMatriculaVincularResponse
  >(api, turmaMatriculaVincular);

  const remove = createRemoveFn(api, turmaMatriculaDesvincularOneById);

  const invalidate = createInvalidate(keys);

  return {
    keys,
    list,
    create,
    remove,
    invalidate,
  };
};
