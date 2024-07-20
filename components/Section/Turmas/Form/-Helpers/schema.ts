import * as yup from 'yup';

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional().default(null),

  curso: yup.object().shape({
    id: yup.string().required('Curso é obrigatório!').default(null),
  }),

  ambientePadraoAula: yup.object().shape({
    id: yup.string().uuid().nullable().optional().default(null),
  }),

  periodo: yup.string().required('Período é obrigatório!').default(''),
});


export const useTurmaFormSchema = () => {
  return schema;
}