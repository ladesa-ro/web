import type { IDisciplinaDoCurso } from '~/composables/ladesa-api/useDisciplinasByCurso';

const identificadorContexto = 'contexto-diarios-form-geral';

export type DiarioPreferenciaAgrupamentoModo = 'DEFINIDO' | 'POR_DIA_SEMANA';

export interface IPreferenciaAgrupamento {
  modo: DiarioPreferenciaAgrupamentoModo;
  ordem: number;
  diaSemanaIso: number | null;
  aulasSeguidas: number;
  dataInicio: string;
  dataFim: string | null;
}

export interface IDisciplinaConfig {
  disciplinaId: string;
  disciplina: IDisciplinaDoCurso;
  accordionOpen: boolean;
  activeTab: 'dias' | 'professores';
  modoAgrupamento: DiarioPreferenciaAgrupamentoModo;
  preferenciasAgrupamento: IPreferenciaAgrupamento[];
  professoresSelecionados: string[];
}

export interface IContextDiariosFormGeral {
  ofertaFormacaoId: Ref<string | null>;
  cursoId: Ref<string | null>;
  turmaId: Ref<string | null>;
  calendarioLetivoId: Ref<string | null>;
  turmaSelecionada: Ref<Record<string, unknown> | null>;
  disciplinasConfig: Ref<IDisciplinaConfig[]>;
  editId: Ref<string | null>;
}

export const createContextDiariosFormGeral = (
  editId?: MaybeRef<string | null>
): IContextDiariosFormGeral => {
  return {
    ofertaFormacaoId: ref<string | null>(null),
    cursoId: ref<string | null>(null),
    turmaId: ref<string | null>(null),
    calendarioLetivoId: ref<string | null>(null),
    turmaSelecionada: ref<Record<string, unknown> | null>(null),
    disciplinasConfig: ref<IDisciplinaConfig[]>([]),
    editId: ref<string | null>(unref(editId) ?? null),
  };
};

export const createAndProvideContextDiariosFormGeral = (
  editId?: MaybeRef<string | null>
) => {
  const contexto = createContextDiariosFormGeral(editId);
  provide(identificadorContexto, contexto);
  return contexto;
};

export function useContextDiariosFormGeral(): IContextDiariosFormGeral {
  const contexto = inject<IContextDiariosFormGeral>(identificadorContexto);
  if (!contexto) {
    throw new Error(
      'useContextDiariosFormGeral: Contexto não encontrado. Certifique-se de que createAndProvideContextDiariosFormGeral foi chamado em um componente pai.'
    );
  }
  return contexto;
}
