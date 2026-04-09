export type {
  AgendamentoLocalItem,
  AgendamentoMergedItem,
} from './useAgendamentosStateCore';

export type AgendamentosState = ReturnType<typeof useAgendamentosStateInternal>;

const AGENDAMENTOS_KEY = Symbol(
  'agendamentos'
) as InjectionKey<AgendamentosState>;

export function useProvideAgendamentos(turmaId: MaybeRef<string | null>) {
  const state = useAgendamentosStateInternal(turmaId);
  provide(AGENDAMENTOS_KEY, state);
  return state;
}

export function useInjectAgendamentos() {
  const state = inject(AGENDAMENTOS_KEY);

  if (!state) {
    throw new Error(
      'useInjectAgendamentos: must be used inside a component that calls useProvideAgendamentos'
    );
  }

  return state;
}

function useAgendamentosStateInternal(turmaId: MaybeRef<string | null>) {
  const core = useAgendamentosStateCore(turmaId);
  const exclusivity = useAgendamentosExclusivity();

  return {
    ...core,
    ...exclusivity,
  };
}
