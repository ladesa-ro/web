import * as yup from 'yup';

export const colecaoSchema = yup
  .object({
    nome: yup.string().required('Nome é obrigatório').default(''),

    cor: yup.string().nullable().default(null),

    visibilidade: yup
      .string()
      .oneOf(['PRIVADA', 'CAMPUS', 'PUBLICA'])
      .required('Visibilidade é obrigatória')
      .default('PRIVADA'),

    campus: yup
      .object()
      .shape({
        id: yup.string().nullable().default(null),
      })
      .nullable()
      .default(null),
  })
  .test(
    'campus-obrigatorio-para-visibilidade-campus',
    'Campus é obrigatório quando a visibilidade é Campus',
    function (value) {
      if (value?.visibilidade !== 'CAMPUS' || value?.campus?.id) return true;
      return this.createError({
        path: 'campus.id',
        message: 'Campus é obrigatório quando a visibilidade é Campus',
      });
    }
  );

export type IColecaoFormValues = yup.InferType<typeof colecaoSchema>;
