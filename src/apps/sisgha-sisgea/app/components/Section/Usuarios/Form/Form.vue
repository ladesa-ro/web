<script lang="ts" setup>
import { useForm } from 'vee-validate';
import type { FormUserOutput, FormUserValues } from './FormUtils';
import { usuarioSchema } from './-Helpers/schema';

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

await suspendQuery(findOneQuery);

const initialFormValues = usuarioSchema.cast(
  {
    ...currentUsuario.value,
    vinculos: currentUsuario.value?.vinculos ?? [],
  },
  {
    stripUnknown: true,
    assert: false,
  }
) as FormUserValues;

const form = useForm<FormUserValues, FormUserOutput>({
  validationSchema: usuarioSchema,
  initialValues: initialFormValues,
});

provide('FORM_USER', form);
</script>

<template>
  <div class="flex gap-3">
    <slot />
  </div>
</template>
