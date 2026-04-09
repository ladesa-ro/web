import { calendarioAgendamentoFindById } from '@ladesa-ro/web.api.client';

export function useAgendamentosExclusivity() {
  const api = useApiClient();

  const exclusivityCache = ref<Map<string, number>>(new Map());

  async function checkExclusivity(eventoId: string): Promise<number> {
    if (exclusivityCache.value.has(eventoId)) {
      return exclusivityCache.value.get(eventoId)!;
    }

    try {
      const result = await api.call(calendarioAgendamentoFindById, {
        path: { id: eventoId },
      });
      const turmasCount =
        (result as { turmas?: unknown[] } | undefined)?.turmas?.length ?? 1;
      exclusivityCache.value = new Map(exclusivityCache.value).set(
        eventoId,
        turmasCount
      );
      return turmasCount;
    } catch {
      return 1;
    }
  }

  function isExclusive(eventoId: string): boolean {
    return (exclusivityCache.value.get(eventoId) ?? 1) <= 1;
  }

  return {
    checkExclusivity,
    isExclusive,
    exclusivityCache: readonly(exclusivityCache),
  };
}
