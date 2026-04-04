import type {
  TurmaEventoFindOneOutputDto,
  TurmaEventoCreateInputDto,
  TurmaEventoUpdateInputDto,
} from '@ladesa-ro/web.api.client';
import { calendarioAgendamentoFindById } from '@ladesa-ro/web.api.client';

export type TurmaEventoLocalItem = {
  tempId: string;
  data: TurmaEventoCreateInputDto;
};

export type TurmaEventoMergedItem = {
  id: string;
  isLocal: boolean;
  isPendingDelete: boolean;
  isPendingUpdate: boolean;
  data: TurmaEventoFindOneOutputDto | TurmaEventoCreateInputDto;
};

export type TurmaEventosState = ReturnType<typeof useTurmaEventosStateInternal>;

const TURMA_EVENTOS_KEY = Symbol('turma-eventos') as InjectionKey<TurmaEventosState>;

export function useProvideTurmaEventos(turmaId: MaybeRef<string | null>) {
  const state = useTurmaEventosStateInternal(turmaId);
  provide(TURMA_EVENTOS_KEY, state);
  return state;
}

export function useInjectTurmaEventos() {
  const state = inject(TURMA_EVENTOS_KEY);

  if (!state) {
    throw new Error('useInjectTurmaEventos: must be used inside a component that calls useProvideTurmaEventos');
  }

  return state;
}

function useTurmaEventosStateInternal(turmaId: MaybeRef<string | null>) {
  const turmaEventos = useTurmaEventos();
  const api = useApiClient();

  const eventosQuery = turmaEventos.findAll(turmaId);

  const pendingCreates = ref<Map<string, TurmaEventoCreateInputDto>>(new Map());
  const pendingUpdates = ref<Map<string, TurmaEventoUpdateInputDto>>(new Map());
  const pendingDeletes = ref<Set<string>>(new Set());

  const exclusivityCache = ref<Map<string, number>>(new Map());

  let tempIdCounter = 0;
  function nextTempId(): string {
    return `__temp_${++tempIdCounter}`;
  }

  const serverEventos = computed<TurmaEventoFindOneOutputDto[]>(() =>
    eventosQuery.data.value?.data ?? [],
  );

  const mergedEventos = computed<TurmaEventoMergedItem[]>(() => {
    const items: TurmaEventoMergedItem[] = [];

    for (const evento of serverEventos.value) {
      const isDeleted = pendingDeletes.value.has(evento.id);
      const pendingUpdate = pendingUpdates.value.get(evento.id);

      items.push({
        id: evento.id,
        isLocal: false,
        isPendingDelete: isDeleted,
        isPendingUpdate: !!pendingUpdate,
        data: pendingUpdate ? { ...evento, ...pendingUpdate } : evento,
      });
    }

    for (const [tempId, data] of pendingCreates.value) {
      if (!pendingDeletes.value.has(tempId)) {
        items.push({
          id: tempId,
          isLocal: true,
          isPendingDelete: false,
          isPendingUpdate: false,
          data,
        });
      }
    }

    return items;
  });

  const visibleEventos = computed(() =>
    mergedEventos.value.filter(e => !e.isPendingDelete),
  );

  const hasPendingChanges = computed(() =>
    pendingCreates.value.size > 0 ||
    pendingUpdates.value.size > 0 ||
    pendingDeletes.value.size > 0,
  );

  function addEvento(data: TurmaEventoCreateInputDto): string {
    const tempId = nextTempId();
    pendingCreates.value = new Map(pendingCreates.value).set(tempId, data);
    return tempId;
  }

  function updateEvento(id: string, data: TurmaEventoUpdateInputDto) {
    if (pendingCreates.value.has(id)) {
      const existing = pendingCreates.value.get(id)!;
      const merged = { ...existing, ...data } as TurmaEventoCreateInputDto;
      pendingCreates.value = new Map(pendingCreates.value).set(id, merged);
    } else {
      const existing = pendingUpdates.value.get(id) ?? {};
      const merged = { ...existing, ...data };
      pendingUpdates.value = new Map(pendingUpdates.value).set(id, merged);
    }
  }

  function removeEvento(id: string) {
    if (pendingCreates.value.has(id)) {
      const next = new Map(pendingCreates.value);
      next.delete(id);
      pendingCreates.value = next;

      const nextUpdates = new Map(pendingUpdates.value);
      nextUpdates.delete(id);
      pendingUpdates.value = nextUpdates;
    } else {
      pendingDeletes.value = new Set(pendingDeletes.value).add(id);

      const nextUpdates = new Map(pendingUpdates.value);
      nextUpdates.delete(id);
      pendingUpdates.value = nextUpdates;
    }
  }

  function undoRemove(id: string) {
    const next = new Set(pendingDeletes.value);
    next.delete(id);
    pendingDeletes.value = next;
  }

  function cancelAll() {
    pendingCreates.value = new Map();
    pendingUpdates.value = new Map();
    pendingDeletes.value = new Set();
  }

  async function saveEventos(turmaIdOverride?: string) {
    const tid = turmaIdOverride ?? unref(turmaId);
    if (!tid) return;

    const creates = [...pendingCreates.value.entries()]
      .filter(([tempId]) => !pendingDeletes.value.has(tempId));

    const updates = [...pendingUpdates.value.entries()]
      .filter(([id]) => !pendingDeletes.value.has(id));

    const deletes = [...pendingDeletes.value]
      .filter(id => !id.startsWith('__temp_'));

    const promises: Promise<unknown>[] = [];

    for (const [, data] of creates) {
      promises.push(turmaEventos.create(tid, data));
    }

    for (const [id, data] of updates) {
      promises.push(turmaEventos.update(tid, id, data));
    }

    for (const id of deletes) {
      promises.push(turmaEventos.remove(tid, id));
    }

    await Promise.all(promises);

    cancelAll();
  }

  async function checkExclusivity(eventoId: string): Promise<number> {
    if (exclusivityCache.value.has(eventoId)) {
      return exclusivityCache.value.get(eventoId)!;
    }

    try {
      const result = await api.call(calendarioAgendamentoFindById, { path: { id: eventoId } });
      const turmasCount = (result as { turmas?: unknown[] } | undefined)?.turmas?.length ?? 1;
      exclusivityCache.value = new Map(exclusivityCache.value).set(eventoId, turmasCount);
      return turmasCount;
    } catch {
      return 1;
    }
  }

  function isExclusive(eventoId: string): boolean {
    return (exclusivityCache.value.get(eventoId) ?? 1) <= 1;
  }

  async function invalidate() {
    await turmaEventos.invalidate();
  }

  return {
    eventosQuery,
    serverEventos,
    mergedEventos,
    visibleEventos,
    hasPendingChanges,

    pendingCreates: readonly(pendingCreates),
    pendingUpdates: readonly(pendingUpdates),
    pendingDeletes: readonly(pendingDeletes),

    addEvento,
    updateEvento,
    removeEvento,
    undoRemove,
    cancelAll,
    saveEventos,
    invalidate,

    checkExclusivity,
    isExclusive,
    exclusivityCache: readonly(exclusivityCache),
  };
}
