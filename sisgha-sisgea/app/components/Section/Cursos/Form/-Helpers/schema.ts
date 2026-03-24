import * as yup from 'yup';

export const cursoSchema = yup.object({
  imagem: yup.mixed().nullable().default(null),
  ofertaFormacao: yup.object({
    id: yup.string().required('Oferta de Formação é obrigatória').default(''),
  }).default({ id: '' }),
  campus: yup.object({
    id: yup.string().required('Campus é obrigatório').default(''),
  }).default({ id: '' }),
  nome: yup.string().required('Nome do curso é obrigatório').default(''),
  nomeAbreviado: yup.string().required('Nome abreviado do curso é obrigatório').default(''),
});

export type ICursoFormValues = yup.InferType<typeof cursoSchema>;
