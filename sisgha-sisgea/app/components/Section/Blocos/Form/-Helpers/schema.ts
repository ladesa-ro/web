import * as yup from 'yup';

export const blocoSchema = yup.object({
  imagem: yup.mixed().nullable().default(null),
  campus: yup.object({
    id: yup.string().required('Campus é obrigatório').default(''),
  }).default({ id: '' }),
  nome: yup.string().required('Nome do bloco é obrigatório').default(''),
  codigo: yup.string().required('Código é obrigatório').default(''),
});

export type IBlocoFormValues = yup.InferType<typeof blocoSchema>;
