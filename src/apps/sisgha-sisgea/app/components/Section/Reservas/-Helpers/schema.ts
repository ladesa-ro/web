import * as yup from 'yup';

export const reservaSchema = yup.object({
  ambiente: yup
    .object({
      id: yup.string().nullable().default(null),
    })
    .test('ambiente-obrigatorio', 'Selecione um ambiente', value => !!value?.id)
    .default({ id: null } as { id: string | null }),
  data: yup.string().required('Informe a data').default('' as string),
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
  motivo: yup
    .string()
    .required('Informe o motivo da reserva')
    .default('' as string),
});

export type IReservaFormValues = yup.InferType<typeof reservaSchema>;
