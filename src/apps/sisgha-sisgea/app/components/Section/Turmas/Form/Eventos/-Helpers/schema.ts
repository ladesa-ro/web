import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    nome: yup
      .string()
      .required('Nome é obrigatório!')
      .default(''),

    cor: yup
      .string()
      .nullable()
      .default(null),

    repeticao: yup
      .string()
      .nullable()
      .default(null),

    diaInteiro: yup
      .boolean()
      .required()
      .default(false),

    dataInicio: yup
      .string()
      .required('Data de início é obrigatória!')
      .default(''),

    dataFim: yup
      .string()
      .nullable()
      .default(null),

    horarioInicio: yup
      .string()
      .nullable()
      .default(null),

    horarioFim: yup
      .string()
      .nullable()
      .default(null),
  })
  .required();

export type IAgendamentoFormSchema = typeof schema;
export type IAgendamentoFormOutput = yup.InferType<IAgendamentoFormSchema>;

export const useAgendamentoFormSchema = () => schema;

/** @deprecated Use IAgendamentoFormSchema instead */
export type ITurmaEventoFormSchema = IAgendamentoFormSchema;
/** @deprecated Use IAgendamentoFormOutput instead */
export type ITurmaEventoFormOutput = IAgendamentoFormOutput;
/** @deprecated Use useAgendamentoFormSchema instead */
export const useTurmaEventoFormSchema = useAgendamentoFormSchema;
