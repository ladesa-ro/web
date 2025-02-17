import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    imagem: yup.mixed().nullable().default(null),

    curso: yup.object().shape({
      id: yup.string().required('Curso é obrigatório!').default(null),
    }),

    ambientePadraoAula: yup
      .object()
      .shape({
        id: yup.string().uuid().required().default(null),
      })
      .nullable(),

    //

    periodo: yup.string().required('Período é obrigatório!').default(''),

    //

    _: yup
      .object({
        modoPeriodo: yup
          .string()
          .oneOf(['periodo', 'serie-letra'])
          .default('periodo')
          .optional(),

        serie: yup.string().when('modoPeriodo', {
          is: 'serie-letra',
          then: schema => schema.required('Série é obrigatória!'),
          otherwise: schema =>
            schema
              .transform(() => null)
              .optional()
              .nullable(),
        }),
        letra: yup.string().when('modoPeriodo', {
          is: 'serie-letra',
          then: schema => schema.required('Letra é obrigatória!'),
          otherwise: schema =>
            schema
              .transform(() => null)
              .optional()
              .nullable(),
        }),
      })
      .optional()
      .default({}),
  })
  .required();

export type ITurmaFormSchema = typeof schema;
export type ITurmaFormOutput = yup.InferType<ITurmaFormSchema>;

export const useTurmaFormSchema = () => schema;
