import * as yup from 'yup';

export const modalidadeSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').default(''),
  slug: yup.string().required('Slug é obrigatório').default(''),
});

export type IModalidadeFormValues = yup.InferType<typeof modalidadeSchema>;
