import {
  createInvalidate,
} from '~/composables/query-helpers';
import type {
  InvalidateFn,
} from '~/composables/query-helpers';
import {
  turmaEventoFindAll,
  turmaEventoCreate,
  turmaEventoUpdate,
  turmaEventoDelete,
} from '@ladesa-ro/web.api.client';
import type {
  TurmaEventoFindAllResponse,
  TurmaEventoCreateInputDto,
  TurmaEventoUpdateInputDto,
  TurmaEventoFindOneOutputDto,
  TurmaEventoListOutputDto,
} from '@ladesa-ro/web.api.client';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

export type IUseTurmaEventos = {
  keys: readonly string[];
  findAll: (turmaId: MaybeRef<string | null>) => UseQueryReturnType<TurmaEventoListOutputDto, Error>;
  create: (turmaId: string, data: TurmaEventoCreateInputDto) => Promise<TurmaEventoFindOneOutputDto | undefined>;
  update: (turmaId: string, eventoId: string, data: TurmaEventoUpdateInputDto) => Promise<TurmaEventoFindOneOutputDto | undefined>;
  remove: (turmaId: string, eventoId: string) => Promise<boolean | undefined>;
  invalidate: InvalidateFn;
};

export const useTurmaEventos = (): IUseTurmaEventos => {
  const api = useApiClient();

  const keys = ['turma-eventos'] as const;

  const findAll = (turmaId: MaybeRef<string | null>) => {
    const queryKey = computed(() => [
      ...keys,
      'list',
      unref(turmaId),
    ]);

    return useQuery({
      queryKey,
      queryFn: () =>
        api.call(turmaEventoFindAll, {
          path: { turmaId: unref(turmaId)! },
        }),
      enabled: computed(() => !!unref(turmaId)),
    });
  };

  const create = async (turmaId: string, data: TurmaEventoCreateInputDto) =>
    api.call(turmaEventoCreate, {
      path: { turmaId },
      body: data,
    });

  const update = async (turmaId: string, eventoId: string, data: TurmaEventoUpdateInputDto) =>
    api.call(turmaEventoUpdate, {
      path: { turmaId, eventoId },
      body: data,
    });

  const remove = async (turmaId: string, eventoId: string) =>
    api.call(turmaEventoDelete, {
      path: { turmaId, eventoId },
    });

  const invalidate = createInvalidate(keys);

  return {
    keys,
    findAll,
    create,
    update,
    remove,
    invalidate,
  };
};
