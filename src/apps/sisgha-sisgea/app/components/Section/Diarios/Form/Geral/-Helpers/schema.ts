import * as yup from 'yup';

const preferenciaAgrupamentoSchema = yup.object({
  modo: yup.string().required().default('DEFINIDO'),
  ordem: yup.number().required().min(1).default(1),
  diaSemanaIso: yup
    .number()
    .nullable()
    .min(1, 'Dia inválido')
    .max(7, 'Dia inválido')
    .default(null),
  aulasSeguidas: yup.number().required().min(1, 'Mínimo 1 aula').default(1),
  // dataInicio/dataFim não são preenchidos pelo usuário na UI;
  // o fallback é aplicado no mapPreferencias() antes do envio à API
  dataInicio: yup.string().optional().default(''),
  dataFim: yup.string().nullable().default(null),
});

const disciplinaConfigSchema = yup.object({
  disciplinaId: yup.string().required('Disciplina é obrigatória').default(''),
  modoAgrupamento: yup.string().required().default('DEFINIDO'),
  preferenciasAgrupamento: yup
    .array()
    .of(preferenciaAgrupamentoSchema)
    .default([]),
  professoresSelecionados: yup
    .array()
    .of(yup.string().required())
    .default([]),
});

export const diariosFormSchema = yup.object({
  calendarioLetivoId: yup
    .string()
    .required('Calendário letivo é obrigatório')
    .default(''),
  ofertaFormacaoId: yup.string().nullable().default(null),
  cursoId: yup.string().nullable().default(null),
  turmaId: yup
    .string()
    .required('Turma é obrigatória')
    .default(''),
  disciplinasConfig: yup
    .array()
    .of(disciplinaConfigSchema)
    .default([])
    .test(
      'min-dias',
      'Pelo menos uma disciplina deve ter dias de aula configurados',
      (arr) => (arr ?? []).some((d) => d.preferenciasAgrupamento.length > 0),
    ),
});

export type IDiariosFormValues = yup.InferType<typeof diariosFormSchema>;
export type IDisciplinaConfigForm = yup.InferType<typeof disciplinaConfigSchema>;
export type IPreferenciaAgrupamentoForm = yup.InferType<typeof preferenciaAgrupamentoSchema>;
