import type { InjectionKey } from 'vue';
import type { FormValidationResult } from 'vee-validate';
import type { IDisciplinaDoCurso } from '~/composables/ladesa-api/useDisciplinasByCurso';

const identificadorContexto = 'contexto-diarios-form-geral';

type DiariosFormValidateFn = (
  opts?: Partial<{ mode: 'validated-only' | 'silent' | 'force' }>
) => Promise<FormValidationResult<Record<string, unknown>>>;

export const diariosFormValidateKey: InjectionKey<DiariosFormValidateFn> =
  Symbol('diarios-form-validate');

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
  campusId: Ref<string | null>;
  ofertaFormacaoId: Ref<string | null>;
  cursoId: Ref<string | null>;
  turmaId: Ref<string | null>;
  calendarioLetivoId: Ref<string | null>;
  turmaSelecionada: Ref<Record<string, unknown> | null>;
  disciplinasConfig: Ref<IDisciplinaConfig[]>;
  editId: Ref<string | null>;
  isLoadingEdit: Ref<boolean>;
}

export interface IFormAccessor {
  values: Record<string, unknown>;
  setValues: (vals: Record<string, unknown>, shouldValidate?: boolean) => void;
}

export const createContextDiariosFormGeral = (
  form: IFormAccessor,
  editId?: MaybeRef<string | null>
): IContextDiariosFormGeral => {
  // Form-backed writable computeds — form is the source of truth
  const campusId = computed({
    get: () => (form.values.campusId as string) || null,
    set: (val: string | null) => {
      form.setValues({ campusId: val ?? '' }, false);
    },
  });

  const calendarioLetivoId = computed({
    get: () => (form.values.calendarioLetivoId as string) || null,
    set: (val: string | null) => {
      form.setValues({ calendarioLetivoId: val ?? '' }, false);
    },
  });

  const ofertaFormacaoId = computed({
    get: () => (form.values.ofertaFormacaoId as string) || null,
    set: (val: string | null) => {
      form.setValues({ ofertaFormacaoId: val ?? undefined }, false);
    },
  });

  const cursoId = computed({
    get: () => (form.values.cursoId as string) || null,
    set: (val: string | null) => {
      form.setValues({ cursoId: val ?? undefined }, false);
    },
  });

  const turmaId = computed({
    get: () => (form.values.turmaId as string) || null,
    set: (val: string | null) => {
      form.setValues({ turmaId: val ?? '' }, false);
    },
  });

  // disciplinasConfig is a ref because it holds UI-only fields (disciplina, accordionOpen, activeTab)
  // that are not part of the form schema. A watcher syncs form-relevant subset to the form.
  const disciplinasConfig = ref<IDisciplinaConfig[]>([]);

  // Sync disciplinasConfig -> form (extract form-only fields)
  watch(
    disciplinasConfig,
    configs => {
      const formConfigs = configs.map(dc => ({
        disciplinaId: dc.disciplinaId,
        modoAgrupamento: dc.modoAgrupamento,
        preferenciasAgrupamento: dc.preferenciasAgrupamento.map(p => ({
          modo: p.modo,
          ordem: p.ordem,
          diaSemanaIso: p.diaSemanaIso,
          aulasSeguidas: p.aulasSeguidas,
          dataInicio: p.dataInicio,
          dataFim: p.dataFim,
        })),
        professoresSelecionados: [...dc.professoresSelecionados],
      }));
      form.setValues({ disciplinasConfig: formConfigs }, false);
    },
    { deep: true }
  );

  return {
    campusId,
    ofertaFormacaoId,
    cursoId,
    turmaId,
    calendarioLetivoId,
    turmaSelecionada: ref<Record<string, unknown> | null>(null),
    disciplinasConfig,
    editId: ref<string | null>(unref(editId) ?? null),
    isLoadingEdit: ref(!!unref(editId)),
  };
};

export const createAndProvideContextDiariosFormGeral = (
  form: IFormAccessor,
  editId?: MaybeRef<string | null>
) => {
  const contexto = createContextDiariosFormGeral(form, editId);
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
