import type {
  CursoFindByIdResponse,
} from '@ladesa-ro/web.api.client';
import type { UseQueryReturnType } from '@tanstack/vue-query';

export type PeriodoDisciplinaLocal = {
  disciplinaId: string;
  cargaHoraria?: number;
};

export type PeriodoLocal = {
  numeroPeriodo: number;
  disciplinas: PeriodoDisciplinaLocal[];
};

export function useCursoPeriodosSync(
  quantidadePeriodos: MaybeRef<number>,
  cursoQuery: UseQueryReturnType<CursoFindByIdResponse | null, Error>,
) {
  const localPeriodos = ref<PeriodoLocal[]>([]);
  const savedPeriodos = ref(new Map<number, Set<string>>());
  const loadingFromServer = ref(false);

  function normalizePeriodos(
    count: number,
    source: PeriodoLocal[],
  ): PeriodoLocal[] {
    return Array.from({ length: count }, (_, i) => {
      const numeroPeriodo = i + 1;
      const existing = source.find(p => p.numeroPeriodo === numeroPeriodo);
      return {
        numeroPeriodo,
        disciplinas: existing?.disciplinas ?? [],
      };
    });
  }

  // ---- Sincronizar dados do servidor (via cursoQuery.data.periodos) ----
  watch(
    () => cursoQuery.data.value,
    serverData => {
      if (!serverData?.periodos) return;

      loadingFromServer.value = true;
      const count = Math.max(unref(quantidadePeriodos) ?? 0, 1);

      const periodosData: PeriodoLocal[] = serverData.periodos.map(p => ({
        numeroPeriodo: p.numeroPeriodo,
        disciplinas: p.disciplinas.map(d => ({
          disciplinaId: d.disciplinaId,
          cargaHoraria: d.cargaHoraria ?? undefined,
        })),
      }));

      localPeriodos.value = normalizePeriodos(count, periodosData);

      const snapshot = new Map<number, Set<string>>();
      for (const p of periodosData) {
        snapshot.set(
          p.numeroPeriodo,
          new Set(p.disciplinas.map((d: PeriodoDisciplinaLocal) => d.disciplinaId)),
        );
      }
      savedPeriodos.value = snapshot;

      nextTick(() => {
        loadingFromServer.value = false;
      });
    },
    { immediate: true },
  );

  // ---- Ajustar array local quando quantidadePeriodos muda ----
  watch(
    () => unref(quantidadePeriodos),
    count => {
      if (!count || count < 1 || loadingFromServer.value) return;

      localPeriodos.value = normalizePeriodos(count, localPeriodos.value);
    },
    { immediate: true },
  );

  // ---- Converter para payload de envio ----

  function toPeriodosPayload() {
    return localPeriodos.value.map(p => ({
      numeroPeriodo: p.numeroPeriodo,
      disciplinas: p.disciplinas.map(d => ({
        disciplinaId: d.disciplinaId,
        ...(d.cargaHoraria != null ? { cargaHoraria: d.cargaHoraria } : {}),
      })),
    }));
  }

  return {
    localPeriodos,
    savedPeriodos,
    loadingFromServer,
    toPeriodosPayload,
  };
}
