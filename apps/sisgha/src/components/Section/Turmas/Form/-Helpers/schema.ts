import * as yup from 'yup';

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional().default(null),

  curso: yup.object().shape({
    id: yup.string().required('Curso é obrigatório!').default(null),
  }),

  ambientePadraoAula: yup.object().shape({
    id: yup.string().uuid().nullable().optional().default(null),
  }),

  //

  periodo: yup.string().required('Período é obrigatório!').default(''),

  //

  _: yup
    .object({
      modoPeriodo: yup
        .string()
        .oneOf(['periodo', 'serie-letra'])
        .default('periodo'),

      serie: yup.string().when('modoPeriodo', {
        is: 'serie-letra',
        then: (schema) => schema.required('Série é obrigatória!'),
        otherwise: (schema) =>
          schema
            .transform(() => null)
            .optional()
            .nullable(),
      }),
      letra: yup.string().when('modoPeriodo', {
        is: 'serie-letra',
        then: (schema) => schema.required('Letra é obrigatória!'),
        otherwise: (schema) =>
          schema
            .transform(() => null)
            .optional()
            .nullable(),
      }),
    })
    .default({}),
});

export const useTurmaFormSchema = () => {
  return schema;
};
