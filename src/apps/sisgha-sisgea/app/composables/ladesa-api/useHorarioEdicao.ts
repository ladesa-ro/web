import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import {
  horarioEdicaoSessaoDiferenca,
  horarioEdicaoSalvar2,
  horarioEdicaoCancelar,
  horarioEdicaoDesfazerMudanca,
} from '@ladesa-ro/web.api.client';
import type { HorarioEdicaoSessaoDiferencaOutputRestDto } from '@ladesa-ro/web.api.client';
import { buildIdempotencyKeyHeaders } from './-helpers/idempotencyKey';

type DiferencaFn = (
  sessaoId: MaybeRef<string | null>
) => UseQueryReturnType<HorarioEdicaoSessaoDiferencaOutputRestDto, Error>;

export const useHorarioEdicao = () => {
  const api = useApiClient();
  const keys = ['horario-edicao'] as const;

  const diferenca: DiferencaFn = sessaoId =>
    useQuery<HorarioEdicaoSessaoDiferencaOutputRestDto>({
      queryKey: computed(() => [...keys, unref(sessaoId), 'diferenca']),
      queryFn: () =>
        api.call(horarioEdicaoSessaoDiferenca, {
          path: { sessaoId: unref(sessaoId)! },
        }),
      enabled: computed(() => !!unref(sessaoId)),
    });

  const publicar = (sessaoId: string, idempotencyKey: string) =>
    api.call(horarioEdicaoSalvar2, {
      path: { sessaoId },
      headers: buildIdempotencyKeyHeaders(idempotencyKey),
    });

  const cancelar = (sessaoId: string) =>
    api.call(horarioEdicaoCancelar, { path: { sessaoId } });

  const desfazerMudanca = (sessaoId: string, mudancaId: string) =>
    api.call(horarioEdicaoDesfazerMudanca, { path: { sessaoId, mudancaId } });

  const invalidate = createInvalidate(keys);

  return { keys, diferenca, publicar, cancelar, desfazerMudanca, invalidate };
};
