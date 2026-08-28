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
import { buildIdempotencyKeyHeaders } from './-helpers/idempotencyKey';

const PROCESSING_STATUSES = new Set(['SOLICITADO', 'PENDENTE']);

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
      refetchInterval: query =>
        PROCESSING_STATUSES.has(query.state.data?.status ?? '') ? 2000 : false,
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
