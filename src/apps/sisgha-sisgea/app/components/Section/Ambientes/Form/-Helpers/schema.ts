import * as yup from 'yup';

export const ambienteSchema = yup.object({
  imagem: yup.mixed<Blob>().nullable().default(null),
  campus: yup
    .object({
      id: yup.string().default(''),
    })
    .default({ id: '' }),
  bloco: yup
    .object({
      id: yup.string().required('Bloco é obrigatório').default(''),
    })
    .default({ id: '' }),
  nome: yup.string().required('Nome é obrigatório').default(''),
  descricao: yup.string().required('Descrição é obrigatória').default(''),
  codigo: yup.string().required('Código é obrigatório').default(''),
  capacidade: yup.number().required('Capacidade é obrigatória').default(0),
  tipo: yup.string().default(''),
});

export type IAmbienteFormValues = yup.InferType<typeof ambienteSchema>;
