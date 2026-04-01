import { useQuery } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import {
  turmaDisponibilidadeFindByWeek,
  turmaDisponibilidadeSave,
} from '@ladesa-ro/web.api.client';
import type {
  TurmaDisponibilidadeWeekOutputDto,
  TurmaDisponibilidadeSaveInputDto,
} from '@ladesa-ro/web.api.client';

export const useTurmaDisponibilidade = () => {
  const api = useApiClient();

  const keys = ['turma-disponibilidade'] as const;

  const findByWeek = (
    turmaId: MaybeRef<string | null>,
    semana: MaybeRef<string>
  ) => {
    return useQuery<TurmaDisponibilidadeWeekOutputDto>({
      queryKey: computed(() => [...keys, unref(turmaId), unref(semana)]),
      queryFn: async () => {
        const id = unref(turmaId);
        const sem = unref(semana);
        if (!id) return { configs: [] };

        return api.call(turmaDisponibilidadeFindByWeek, {
          path: { turmaId: id },
          query: { semana: sem },
        });
      },
      enabled: computed(() => !!unref(turmaId)),
      staleTime: 0,
    });
  };

  const save = async (
    turmaId: string,
    payload: TurmaDisponibilidadeSaveInputDto
  ) => {
    return api.call(turmaDisponibilidadeSave, {
      path: { turmaId },
      body: payload,
    });
  };

  const invalidate = createInvalidate(keys);

  return { keys, findByWeek, save, invalidate };
};
