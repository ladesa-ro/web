import { useQuery } from '@tanstack/vue-query';
import { createInvalidate } from '~/composables/query-helpers';

// --- Types (local until SDK is regenerated with disponibilidade endpoints) ---

export type DisponibilidadeIntervalo = {
  inicio: string;
  fim: string;
};

export type DisponibilidadeDia = {
  dia_semana: number;
  intervalos: DisponibilidadeIntervalo[];
};

export type DisponibilidadeConfig = {
  data_inicio: string;
  data_fim: string | null;
  horarios: DisponibilidadeDia[];
};

export type TurmaDisponibilidadeWeekOutput = {
  configs: DisponibilidadeConfig[];
  grade_campus_hash?: string;
};

export type TurmaDisponibilidadeSaveInput = {
  configs: DisponibilidadeConfig[];
  aplicar_futuras?: boolean;
};

// --- Composable ---

export const useTurmaDisponibilidade = () => {
  const api = useApiClient();

  const keys = ['turma-disponibilidade'] as const;

  const findByWeek = (
    turmaId: MaybeRef<string | null>,
    semana: MaybeRef<string>
  ) => {
    return useQuery<TurmaDisponibilidadeWeekOutput>({
      queryKey: computed(() => [...keys, unref(turmaId), unref(semana)]),
      queryFn: async () => {
        const id = unref(turmaId);
        const sem = unref(semana);
        if (!id) return { configs: [] };

        const response = await api.client.get({
          url: '/turmas/{turmaId}/disponibilidade' as never,
          path: { turmaId: id },
          query: { semana: sem },
        });

        return (response.data as TurmaDisponibilidadeWeekOutput) ?? { configs: [] };
      },
      enabled: computed(() => !!unref(turmaId)),
    });
  };

  const save = async (
    turmaId: string,
    payload: TurmaDisponibilidadeSaveInput
  ) => {
    const response = await api.client.put({
      url: '/turmas/{turmaId}/disponibilidade' as never,
      path: { turmaId },
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  };

  const invalidate = createInvalidate(keys);

  return { keys, findByWeek, save, invalidate };
};
