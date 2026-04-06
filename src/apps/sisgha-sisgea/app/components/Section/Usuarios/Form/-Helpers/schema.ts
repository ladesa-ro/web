import * as yup from 'yup';
import { Cargo } from '~/utils/constants';

export const usuarioSchema = yup.object().shape({
  imagem: yup.mixed<Blob>().nullable().optional().default(null),

  nome: yup.string().required('Nome é obrigatório!').default(''),

  email: yup
    .string()
    .required('Email é obrigatório!')
    .email('Informe um e-mail válido!')
    .default(''),

  matricula: yup.string().required('Matrícula é obrigatório!').default(''),

  vinculos: yup
    .array()
    .of(
      yup.object({
        campus: yup.object({
          id: yup
            .string()
            .required('Informe o campus deste vínculo!')
            .nullable()
            .default(null),
        }),

        cargo: yup
          .string()
          .oneOf(Object.values(Cargo), 'Selecione um cargo válido!')
          .required('Informe o cargo deste vínculo!')
          .nullable()
          .default(null),
      })
    )
    .test('unique-vinculos', 'Há vínculos duplicados!', vinculos => {
      if (!vinculos) return true;
      const keys = vinculos
        .filter(v => v.campus?.id && v.cargo)
        .map(v => `${v.campus.id}::${v.cargo}`);
      return keys.length === new Set(keys).size;
    })
    .default([{ campus: { id: null }, cargo: null }]),
});
