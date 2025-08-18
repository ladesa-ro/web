const identificadorContexto = 'contexto-diarios-form-geral';

export type IDisciplina = {
  id: string | number;
  nome: string;
  cargaHoraria: number;
  [key: string]: any;
};

export type TurmaSelecionada = {
  id: string;
  nome: string;
  turno: string;
};

type IContextDiariosFormGeral = {
  disciplinaId: Ref<string | null>;
  disciplinaSelecionada: Ref<IDisciplina | null>;
  turmasSelecionadas?: Ref<TurmaSelecionada[]>;
};

export const createContextDiariosFormGeral = (): IContextDiariosFormGeral => {
  const disciplinaId = ref<string | null>(null);
  const disciplinaSelecionada = ref<IDisciplina | null>(null);
  const turmasSelecionadas = ref<TurmaSelecionada[]>([]);

  return { disciplinaId, disciplinaSelecionada, turmasSelecionadas };
};

export const createAndProvideContextDiariosFormGeral = () => {
  const contexto = createContextDiariosFormGeral();
  provide(identificadorContexto, contexto);
  return contexto;
};

export function useContextDiariosFormGeral(): IContextDiariosFormGeral {
  const contexto = inject<IContextDiariosFormGeral>(identificadorContexto);
  if (!contexto) {
    throw new Error('Contexto de DiariosFormGeral não encontrado!');
  }
  return contexto;
}
