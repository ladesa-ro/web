import * as yup from 'yup';

const participantesSchema = yup
  .object({
    todosParticipam: yup.boolean().required().default(false),
    turmas: yup
      .array()
      .of(yup.object({ id: yup.string().required() }))
      .default([]),
    perfis: yup
      .array()
      .of(yup.object({ id: yup.string().required() }))
      .default([]),
    ofertasFormacao: yup
      .array()
      .of(yup.object({ id: yup.string().required() }))
      .default([]),
  })
  .default({
    todosParticipam: false,
    turmas: [],
    perfis: [],
    ofertasFormacao: [],
  });

export type IParticipantesData = yup.InferType<typeof participantesSchema>;

const schema = yup
  .object()
  .shape({
    nome: yup.string().required('Nome é obrigatório!').default(''),

    cor: yup.string().nullable().default(null),

    repeticao: yup.string().nullable().default(null),

    diaInteiro: yup.boolean().required().default(false),

    dataInicio: yup
      .string()
      .required('Data de início é obrigatória!')
      .default(''),

    dataFim: yup.string().nullable().default(null),

    horarioInicio: yup.string().nullable().default(null),

    horarioFim: yup.string().nullable().default(null),

    participantes: participantesSchema,
  })
  .required();

export type IAgendamentoFormSchema = typeof schema;
export type IAgendamentoFormOutput = yup.InferType<IAgendamentoFormSchema>;

export const useAgendamentoFormSchema = () => schema;
