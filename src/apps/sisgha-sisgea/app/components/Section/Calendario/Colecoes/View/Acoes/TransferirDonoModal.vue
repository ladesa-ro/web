<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{ colecaoId: string; donoAtualNome?: string | null }>();
const emit = defineEmits<{ transferred: [] }>();

const isActive = ref(false);
const confirmTransfer = useConfirmDelete();

const colecoes = useCalendarioColecao();
const { handle: handleWriteError, conflictMessage, clearConflictMessage } =
  useApiWriteErrorHandler();

const schema = yup.object({
  novoDono: yup
    .object({ id: yup.string().required('Selecione um usuário').default('') })
    .required(),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
});

function onOpen() {
  clearConflictMessage();
  resetForm({ values: schema.getDefault() });
  isActive.value = true;
}

function onClose() {
  isActive.value = false;
}

const onSubmit = handleSubmit(async formValues => {
  const confirmed = await confirmTransfer.confirm();
  if (!confirmed) return;

  try {
    await colecoes.transferirDono(props.colecaoId, {
      novoDonoId: formValues.novoDono.id,
    });
  } catch (err) {
    const handled = await handleWriteError(err);
    if (!handled) throw err;
    return;
  }

  emit('transferred');
  onClose();
});
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <UIButtonDefault type="button" @click.stop.prevent="onOpen">
        Transferir dono
      </UIButtonDefault>
    </template>

    <DialogModalBaseLayout title="Transferir dono da coleção" :on-close="onClose">
      <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
        <p
          v-if="conflictMessage"
          class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
        >
          {{ conflictMessage }}
        </p>

        <p class="text-sm text-ldsa-grey">
          O dono atual ({{ donoAtualNome ?? '-' }}) perderá o controle
          implícito sobre esta coleção.
        </p>

        <VVAutocompleteAPIUsuario name="novoDono.id" label="Novo dono" />
      </form>

      <template #button-group>
        <UIButtonModalCancel @click="onClose" />
        <UIButtonModalSave @click="onSubmit" />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>

  <DialogConfirm
    v-model="confirmTransfer.isOpen.value"
    title="Transferir dono"
    :message="`Tem certeza? Você deixará de ser o dono desta coleção e perderá o controle implícito sobre ela.`"
    @confirm="confirmTransfer.onConfirm"
  />
</template>
