import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import {
  gerarHorarioCreate,
  gerarHorarioFindById,
  gerarHorarioAceitar,
  gerarHorarioRejeitar,
} from '@ladesa-ro/web.api.client';
import type {
  GerarHorarioCreateInputDto,
  GerarHorarioFindOneOutputDto,
} from '@ladesa-ro/web.api.client';
import { buildIdempotencyKeyHeaders } from '@ladesa-ro/web.utils';

const PROCESSING_STATUSES = new Set(['SOLICITADO', 'PENDENTE']);

const POLL_INTERVAL_INITIAL_MS = 3000;
const POLL_INTERVAL_MAX_MS = 10000;

type FindByIdFn = (
  id: MaybeRef<string | null>
) => UseQueryReturnType<GerarHorarioFindOneOutputDto, Error>;

export const useGerarHorario = () => {
  const api = useApiClient();
  const keys = ['gerar-horario'] as const;

  const findById: FindByIdFn = id =>
    useQuery<GerarHorarioFindOneOutputDto>({
      queryKey: computed(() => [...keys, unref(id)]),
      queryFn: () =>
        api.call(gerarHorarioFindById, { path: { id: unref(id)! } }),
      enabled: computed(() => !!unref(id)),
      refetchInterval: query => {
        if (!PROCESSING_STATUSES.has(query.state.data?.status ?? '')) {
          return false;
        }

        const attempts = query.state.dataUpdateCount;

        return Math.min(
          POLL_INTERVAL_INITIAL_MS * 2 ** attempts,
          POLL_INTERVAL_MAX_MS
        );
      },
    });

  const create = (body: GerarHorarioCreateInputDto, idempotencyKey: string) =>
    api.call(gerarHorarioCreate, {
      body,
      headers: buildIdempotencyKeyHeaders(idempotencyKey),
    });

  const aceitar = (id: string) =>
    api.call(gerarHorarioAceitar, { path: { id } });

  const rejeitar = (id: string) =>
    api.call(gerarHorarioRejeitar, { path: { id } });

  const invalidate = createInvalidate(keys);

  return { keys, findById, create, aceitar, rejeitar, invalidate };
};
