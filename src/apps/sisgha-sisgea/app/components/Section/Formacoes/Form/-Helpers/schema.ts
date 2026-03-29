import * as yup from 'yup';

const etapaSchema = yup.object({
  nome: yup.string().required('Nome da etapa é obrigatório').default(''),
  cor: yup.string().required('Cor é obrigatória').default('#000000'),
});

const periodoSchema = yup.object({
  numeroPeriodo: yup.number().required().default(1),
  etapas: yup
    .array()
    .of(etapaSchema)
    .min(1, 'Cada período deve ter ao menos 1 etapa')
    .default([{ nome: '', cor: '#000000' }]),
});

export const ofertaFormacaoSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').default(''),
  slug: yup.string().required('Nome abreviado é obrigatório').default(''),
  duracaoPeriodoEmMeses: yup
    .number()
    .required('Duração do período é obrigatória')
    .default(6),
  modalidade: yup
    .object({
      id: yup.string().required('Modalidade é obrigatória').default(''),
    })
    .default({ id: '' }),
  campus: yup
    .object({
      id: yup.string().required('Campus é obrigatório').default(''),
    })
    .default({ id: '' }),
  niveisFormacoes: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required().default(''),
      })
    )
    .min(1, 'Selecione pelo menos um nível de formação')
    .default([]),
  periodos: yup.array().of(periodoSchema).default([]),
});

export type IOfertaFormacaoFormValues = yup.InferType<
  typeof ofertaFormacaoSchema
>;

export function transformForApi(data: IOfertaFormacaoFormValues) {
  return data;
}
