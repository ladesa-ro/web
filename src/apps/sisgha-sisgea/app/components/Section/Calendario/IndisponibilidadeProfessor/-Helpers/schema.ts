import * as yup from 'yup';

export const indisponibilidadeSchema = yup.object({
  modo: yup
    .mixed<'semanal' | 'data'>()
    .oneOf(['semanal', 'data'])
    .required()
    .default('semanal' as 'semanal' | 'data'),
  diaSemana: yup
    .number()
    .nullable()
    .default(0 as number | null),
  data: yup
    .string()
    .nullable()
    .default(null as string | null),
  inicio: yup
    .string()
    .required('Informe o horário inicial')
    .default('' as string),
  fim: yup
    .string()
    .required('Informe o horário final')
    .default('' as string)
    .test(
      'fim-depois-inicio',
      'O horário final deve ser depois do inicial',
      function (fim) {
        const { inicio } = this.parent as { inicio?: string };
        if (!inicio || !fim) return true;
        return fim > inicio;
      }
    ),
  tipo: yup
    .mixed<'BLOQUEIO' | 'PREFERENCIA'>()
    .oneOf(['BLOQUEIO', 'PREFERENCIA'])
    .required()
    .default('BLOQUEIO' as 'BLOQUEIO' | 'PREFERENCIA'),
  motivo: yup
    .string()
    .nullable()
    .default('' as string),
});

export type IIndisponibilidadeFormValues = yup.InferType<
  typeof indisponibilidadeSchema
>;
