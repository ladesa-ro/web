import * as yup from 'yup';

export const disciplinaSchema = yup.object({
  imagem: yup.mixed().nullable().default(null),
  nome: yup.string().required('Nome é obrigatório').default(''),
  nomeAbreviado: yup.string().required('Nome abreviado é obrigatório').default(''),
  cargaHoraria: yup.number().required('Carga horária é obrigatória').default(0),
});

export type IDisciplinaFormValues = yup.InferType<typeof disciplinaSchema>;
