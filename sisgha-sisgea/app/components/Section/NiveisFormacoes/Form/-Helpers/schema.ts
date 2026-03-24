import * as yup from 'yup';

export const nivelFormacaoSchema = yup.object({
  slug: yup.string().required('Slug é obrigatório').default(''),
});

export type INivelFormacaoFormValues = yup.InferType<typeof nivelFormacaoSchema>;
