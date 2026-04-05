import type {
  CalendarioAgendamentoFindOneOutputDto,
  CalendarioAgendamentoCreateInputDto,
  CalendarioAgendamentoUpdateInputDto,
} from '@ladesa-ro/web.api.client';
import { calendarioAgendamentoFindById } from '@ladesa-ro/web.api.client';

export type AgendamentoLocalItem = {
  tempId: string;
  data: CalendarioAgendamentoCreateInputDto;
};

export type AgendamentoMergedItem = {
  id: string;
  isLocal: boolean;
  isPendingDelete: boolean;
  isPendingUpdate: boolean;
  data: CalendarioAgendamentoFindOneOutputDto | CalendarioAgendamentoCreateInputDto;
};

export type AgendamentosState = ReturnType<typeof useAgendamentosStateInternal>;

const AGENDAMENTOS_KEY = Symbol('agendamentos') as InjectionKey<AgendamentosState>;

export function useProvideAgendamentos(turmaId: MaybeRef<string | null>) {
  const state = useAgendamentosStateInternal(turmaId);
  provide(AGENDAMENTOS_KEY, state);
  return state;
}

export function useInjectAgendamentos() {
  const state = inject(AGENDAMENTOS_KEY);

  if (!state) {
    throw new Error('useInjectAgendamentos: must be used inside a component that calls useProvideAgendamentos');
  }

  return state;
}

function useAgendamentosStateInternal(turmaId: MaybeRef<string | null>) {
  const agendamentos = useCalendarioAgendamento();
  const api = useApiClient();

  const eventosQuery = agendamentos.findAll(
    computed(() => {
      const tid = unref(turmaId);
      if (!tid) return undefined;
      return { 'filter.turma.id': [tid], limit: 100 };
    }),
  );

  const pendingCreates = ref<Map<string, CalendarioAgendamentoCreateInputDto>>(new Map());
  const pendingUpdates = ref<Map<string, CalendarioAgendamentoUpdateInputDto>>(new Map());
  const pendingDeletes = ref<Set<string>>(new Set());

  const exclusivityCache = ref<Map<string, number>>(new Map());

  let tempIdCounter = 0;
  function nextTempId(): string {
    return `__temp_${++tempIdCounter}`;
  }

  const serverEventos = computed<CalendarioAgendamentoFindOneOutputDto[]>(() =>
    eventosQuery.data.value?.data ?? [],
  );

  const mergedEventos = computed<AgendamentoMergedItem[]>(() => {
    const items: AgendamentoMergedItem[] = [];

    for (const evento of serverEventos.value) {
      const isDeleted = pendingDeletes.value.has(evento.id);
      const pendingUpdate = pendingUpdates.value.get(evento.id);

      items.push({
        id: evento.id,
        isLocal: false,
        isPendingDelete: isDeleted,
        isPendingUpdate: !!pendingUpdate,
        data: pendingUpdate ? { ...evento, ...pendingUpdate } as CalendarioAgendamentoFindOneOutputDto : evento,
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

  function addEvento(data: CalendarioAgendamentoCreateInputDto): string {
    const tempId = nextTempId();
    pendingCreates.value = new Map(pendingCreates.value).set(tempId, data);
    return tempId;
  }

  function updateEvento(id: string, data: CalendarioAgendamentoUpdateInputDto) {
    if (pendingCreates.value.has(id)) {
      const existing = pendingCreates.value.get(id)!;
      const merged = { ...existing, ...data } as CalendarioAgendamentoCreateInputDto;
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
      promises.push(agendamentos.create({
        ...data,
        tipo: 'EVENTO',
        turmas: [{ id: tid }],
      }));
    }

    for (const [id, data] of updates) {
      promises.push(agendamentos.update(id, data));
    }

    for (const id of deletes) {
      promises.push(agendamentos.remove(id));
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
    await agendamentos.invalidate();
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
