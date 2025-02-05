<script setup lang="ts">
import groupBy from 'lodash/groupBy';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useApiUsuarioVinculosAtivos } from '../../../../utils/integrations/api/depreacted/v1/usuarios/useApiUsuarioVinculosAtivos';
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

const {
  composables: { useFindOneQuery },
} = useLadesaApiCrudUsuarios();

const { data: currentUsuario } = await useFindOneQuery()(editIdRef);

const { vinculosAtivos } = await useApiUsuarioVinculosAtivos(editIdRef);

const currentUsuarioVinculos = computed(() => {
  return Object.entries(groupBy(vinculosAtivos.value, 'campus.id')).map(
    ([campusId, vinculos]) => {
      return {
        campus: {
          id: campusId,
        },
        cargos: vinculos.map((vinculo) => vinculo.cargo),
      };
    }
  );
});

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional().default(null),

  nome: yup.string().required('Nome é obrigatório!').default(''),

  email: yup
    .string()
    .required('Email é obrigatório!')
    .email('Informe um e-mail válido!')
    .default(''),

  matriculaSiape: yup.string().required('Matrícula é obrigatório!').default(''),

  vinculos: yup
    .array()
    .of(
      yup
        .object({
          ativo: yup.boolean().default(true),

          campus: yup.object({
            id: yup
              .string()
              .required('Informe o campus deste vínculo!')
              .default(null),
          }),

          cargos: yup
            .array()

            .of(yup.string().oneOf(['dape', 'professor']).required())

            .when('ativo', {
              is: true,
              then: (schema) =>
                schema.min(
                  1,
                  'O usuário deve possuir ao menos 1 cargo neste vínculo!'
                ),
              otherwise: (schema) => schema.transform(() => []),
            })
            .default([]),
        })
        .transform((data) => {
          if (typeof data.cargo === 'string') {
            return {
              ...data,
              cargos: [data.cargo],
            };
          }
          return data;
        })
    )

    .default([
      {
        campus: { id: null },
        cargos: [],
      },
    ] as any),
});

const initialFormValues = reactive({
  ...schema.cast(
    {
      ...currentUsuario.value,
      vinculos: currentUsuarioVinculos.value,
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
