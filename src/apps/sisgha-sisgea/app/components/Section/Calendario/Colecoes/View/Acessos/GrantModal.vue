<script lang="ts" setup>
import * as yup from 'yup';
import { useForm, useFormValues } from 'vee-validate';

const props = defineProps<{ colecaoId: string }>();
const emit = defineEmits<{ granted: [] }>();

const isActive = ref(false);

const colecoes = useCalendarioColecao();

const { handle: handleWriteError, conflictMessage, clearConflictMessage } =
  useApiWriteErrorHandler();

type IGrantForm = {
  escopo: 'USUARIO' | 'CAMPUS' | 'PUBLICO';
  usuario: { id: string | null } | null;
  campus: { id: string | null } | null;
  papel: 'OCUPACAO' | 'LEITOR' | 'EDITOR';
};

const schema = yup
  .object({
    escopo: yup
      .string()
      .oneOf(['USUARIO', 'CAMPUS', 'PUBLICO'])
      .required('Escopo é obrigatório')
      .default('USUARIO'),
    usuario: yup
      .object({ id: yup.string().nullable().default(null) })
      .nullable()
      .default(null),
    campus: yup
      .object({ id: yup.string().nullable().default(null) })
      .nullable()
      .default(null),
    papel: yup
      .string()
      .oneOf(['OCUPACAO', 'LEITOR', 'EDITOR'])
      .required('Papel é obrigatório')
      .default('LEITOR'),
  })
  .test('alvo-obrigatorio', 'Selecione o alvo do acesso', function (value) {
    if (value?.escopo === 'USUARIO' && !value?.usuario?.id) {
      return this.createError({
        path: 'usuario.id',
        message: 'Selecione um usuário',
      });
    }
    if (value?.escopo === 'CAMPUS' && !value?.campus?.id) {
      return this.createError({
        path: 'campus.id',
        message: 'Selecione um campus',
      });
    }
    return true;
  });

const { handleSubmit, resetForm, isSubmitting } = useForm<IGrantForm>({
  validationSchema: schema,
  initialValues: schema.getDefault() as IGrantForm,
});

const formValues = useFormValues();
const escopo = computed(() => formValues.value.escopo as string | undefined);

const escopoItems = [
  { label: 'Usuário', value: 'USUARIO' },
  { label: 'Campus', value: 'CAMPUS' },
  { label: 'Público', value: 'PUBLICO' },
];

const papelItems = [
  { label: 'Ocupação', value: 'OCUPACAO' },
  { label: 'Leitor', value: 'LEITOR' },
  { label: 'Editor', value: 'EDITOR' },
];

function onOpen() {
  clearConflictMessage();
  resetForm({ values: schema.getDefault() });
  isActive.value = true;
}

function onClose() {
  isActive.value = false;
}

const onSubmit = handleSubmit(async values => {
  const payload = {
    escopo: values.escopo,
    papel: values.papel,
    usuario:
      values.escopo === 'USUARIO' && values.usuario?.id
        ? { id: values.usuario.id }
        : null,
    campus:
      values.escopo === 'CAMPUS' && values.campus?.id
        ? { id: values.campus.id }
        : null,
  };

  try {
    await colecoes.acessos.conceder(props.colecaoId, payload);
  } catch (err) {
    const handled = await handleWriteError(err);
    if (!handled) throw err;
    return;
  }

  emit('granted');
  onClose();
});
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonDefault type="button" @click.stop.prevent="onOpen">
        Conceder acesso
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout title="Conceder acesso" :on-close="onClose">
      <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
        <p
          v-if="conflictMessage"
          class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
        >
          {{ conflictMessage }}
        </p>

        <SectionCalendarioColecoesSharedEnumSelectField
          name="escopo"
          label="Escopo"
          :items="escopoItems"
          :required="true"
        />

        <VVAutocompleteAPIUsuario
          v-if="escopo === 'USUARIO'"
          name="usuario.id"
        />

        <VVAutocompleteAPICampus v-if="escopo === 'CAMPUS'" name="campus.id" />

        <SectionCalendarioColecoesSharedEnumSelectField
          name="papel"
          label="Papel"
          :items="papelItems"
          :required="true"
        />
      </form>

      <template #button-group>
        <UIButtonModalCancel @click="onClose" />
        <UIButtonModalSave :disabled="isSubmitting" @click="onSubmit" />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
