import * as yup from 'yup';

export const aberturaSolicitacaoSchema = yup.object({
  tipoOperacao: yup
    .mixed<'MOVER' | 'REMOVER'>()
    .oneOf(['MOVER', 'REMOVER'])
    .required()
    .default('MOVER' as 'MOVER' | 'REMOVER'),
  data: yup
    .string()
    .nullable()
    .default(null as string | null),
  horarioInicio: yup
    .string()
    .nullable()
    .default(null as string | null),
  horarioFim: yup
    .string()
    .nullable()
    .default(null as string | null),
  ambienteId: yup
    .string()
    .nullable()
    .default(null as string | null),
  justificativa: yup
    .string()
    .required('Informe a justificativa')
    .default('' as string),
});

export type IAberturaSolicitacaoFormValues = yup.InferType<
  typeof aberturaSolicitacaoSchema
>;

export const recusarSolicitacaoSchema = yup.object({
  motivoRecusa: yup
    .string()
    .nullable()
    .default('' as string),
});
