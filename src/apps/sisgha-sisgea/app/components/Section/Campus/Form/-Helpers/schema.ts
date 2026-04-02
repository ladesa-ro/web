import * as yup from 'yup';

export const campusSchema = yup.object({
  nomeFantasia: yup.string().required('Nome fantasia é obrigatório').default(''),
  razaoSocial: yup.string().required('Razão social é obrigatória').default(''),
  apelido: yup.string().required('Apelido é obrigatório').default(''),
  cnpj: yup.string().required('CNPJ é obrigatório').default(''),
  endereco: yup.object({
    cep: yup.string().required('CEP é obrigatório').default(''),
    logradouro: yup.string().required('Logradouro é obrigatório').default(''),
    numero: yup.number().required('Número é obrigatório').default(0),
    bairro: yup.string().required('Bairro é obrigatório').default(''),
    complemento: yup.string().nullable().default(null),
    pontoReferencia: yup.string().nullable().default(null),
    cidade: yup.object({
      id: yup.number().required('Cidade é obrigatória').default(0),
    }).default({ id: 0 }),
  }).default({
    cep: '',
    logradouro: '',
    numero: 0,
    bairro: '',
    complemento: null,
    pontoReferencia: null,
    cidade: { id: 0 },
  }),
});

export type ICampusFormValues = yup.InferType<typeof campusSchema>;
