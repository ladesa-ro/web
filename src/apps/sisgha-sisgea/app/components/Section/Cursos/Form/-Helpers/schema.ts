import * as yup from 'yup';

export const cursoSchema = yup.object({
  imagem: yup.mixed<Blob>().nullable().default(null),
  ofertaFormacao: yup
    .object({
      id: yup.string().required('Formação é obrigatória').default(''),
    })
    .default({ id: '' }),
  campus: yup
    .object({
      id: yup.string().required('Campus é obrigatório').default(''),
    })
    .default({ id: '' }),
  nome: yup.string().required('Nome do curso é obrigatório').default(''),
  nomeAbreviado: yup
    .string()
    .required('Nome abreviado do curso é obrigatório')
    .default(''),
  quantidadePeriodos: yup
    .number()
    .transform((value, original) => (original === '' ? undefined : Number(original)))
    .required('Quantidade de períodos é obrigatória')
    .min(1, 'Mínimo 1 período')
    .max(12, 'Máximo 12 períodos')
    .default(1),
  periodos: yup
    .array()
    .of(
      yup.object({
        numeroPeriodo: yup.number().required(),
        disciplinas: yup
          .array()
          .of(
            yup.object({
              disciplinaId: yup.string().required(),
              cargaHoraria: yup.number().optional(),
            }),
          )
          .default([]),
      }),
    )
    .default([]),
});

export type ICursoFormValues = yup.InferType<typeof cursoSchema>;
