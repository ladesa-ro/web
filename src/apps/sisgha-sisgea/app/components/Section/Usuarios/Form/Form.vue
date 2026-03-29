<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { Cargo } from './FormUtils';
import type { FormUserOutput, FormUserValues } from './FormUtils';

//

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

//

const editIdRef = toRef(props, 'editId');

//

const usuarios = useUsuarios();

const findOneQuery = usuarios.findOne(editIdRef);
const currentUsuario = findOneQuery.data;
await findOneQuery.suspense();

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional().default(null),

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
            .default(null),
        }),

        cargo: yup
          .string()
          .oneOf(Object.values(Cargo), 'Selecione um cargo válido!')
          .required('Informe o cargo deste vínculo!')
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
    .default([{ campus: { id: null }, cargo: null }] as any),
});

const initialFormValues = reactive({
  ...schema.cast(
    {
      ...currentUsuario.value,
      vinculos: currentUsuario.value?.vinculos ?? [],
    },
    {
      stripUnknown: true,
      assert: false,
    }
  ),
});

const form = useForm<FormUserValues, FormUserOutput>({
  validationSchema: schema,
  initialValues: initialFormValues as any,
});

provide('FORM_USER', form);
</script>

<template>
  <div class="flex gap-3">
    <slot />
  </div>
</template>
