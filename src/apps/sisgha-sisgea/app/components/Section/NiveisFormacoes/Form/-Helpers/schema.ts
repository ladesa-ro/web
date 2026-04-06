import * as yup from 'yup';

export const nivelFormacaoSchema = yup.object({
  imagem: yup.mixed<Blob>().nullable().default(null),
  nome: yup.string().required('Nome é obrigatório').default(''),
  slug: yup.string().required('Slug é obrigatório').default(''),
});

export type INivelFormacaoFormValues = yup.InferType<
  typeof nivelFormacaoSchema
>;
