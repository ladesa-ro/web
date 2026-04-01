import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';
import {
  turmaDisponibilidadeDeactivate,
  turmaDisponibilidadeFindAllActive,
  turmaDisponibilidadeFindByWeek,
  turmaDisponibilidadeSave,
} from '@ladesa-ro/web.api.client';
import type {
  TurmaDisponibilidadeAllOutputDto,
  TurmaDisponibilidadeSaveInputDto,
  TurmaDisponibilidadeWeekOutputDto,
} from '@ladesa-ro/web.api.client';

export const useTurmaDisponibilidade = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const keys = ['turma-disponibilidade'] as const;

  const fetchWeek = async (id: string, semana: string) => {
    return api.call(turmaDisponibilidadeFindByWeek, {
      path: { turmaId: id },
      query: { semana },
    });
  };

  const findByWeek = (
    turmaId: MaybeRef<string | null>,
    semana: MaybeRef<string>,
  ) => {
    return useQuery<TurmaDisponibilidadeWeekOutputDto>({
      queryKey: computed(() => [...keys, unref(turmaId), unref(semana)]),
      queryFn: async () => {
        const id = unref(turmaId);
        const sem = unref(semana);
        if (!id) return { configs: [] };
        return fetchWeek(id, sem);
      },
      enabled: computed(() => !!unref(turmaId)),
      staleTime: 0,
    });
  };

  const findAllActive = (turmaId: MaybeRef<string | null>) => {
    return useQuery<TurmaDisponibilidadeAllOutputDto>({
      queryKey: computed(() => [...keys, 'all', unref(turmaId)]),
      queryFn: async () => {
        const id = unref(turmaId);
        if (!id) return { configs: [] };
        return api.call(turmaDisponibilidadeFindAllActive, {
          path: { turmaId: id },
        });
      },
      enabled: computed(() => !!unref(turmaId)),
      staleTime: 0,
    });
  };

  const prefetchWeek = (turmaId: string, semana: string) => {
    queryClient.prefetchQuery({
      queryKey: [...keys, turmaId, semana],
      queryFn: () => fetchWeek(turmaId, semana),
      staleTime: 0,
    });
  };

  const save = async (
    turmaId: string,
    payload: TurmaDisponibilidadeSaveInputDto,
  ) => {
    return api.call(turmaDisponibilidadeSave, {
      path: { turmaId },
      body: payload,
    });
  };

  const deactivate = async (turmaId: string, configId: string) => {
    await api.call(turmaDisponibilidadeDeactivate, {
      path: { turmaId, configId },
    });
    await invalidate();
  };

  const invalidate = createInvalidate(keys);

  return { keys, findByWeek, findAllActive, prefetchWeek, save, deactivate, invalidate };
};
