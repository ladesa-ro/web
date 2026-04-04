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
      .when('diaInteiro', {
        is: false,
        then: schema => schema.required('Horário de início é obrigatório!'),
        otherwise: schema => schema.nullable().default(null),
      }),

    horarioFim: yup
      .string()
      .when('diaInteiro', {
        is: false,
        then: schema => schema.required('Horário de fim é obrigatório!'),
        otherwise: schema => schema.nullable().default(null),
      }),
  })
  .required();

export type ITurmaEventoFormSchema = typeof schema;
export type ITurmaEventoFormOutput = yup.InferType<ITurmaEventoFormSchema>;

export const useTurmaEventoFormSchema = () => schema;
