<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { recusarSolicitacaoSchema } from './-Helpers/schema';
import TextareaField from './-Helpers/TextareaField.vue';

const props = defineProps<{
  modelValue: boolean;
  solicitacaoId: string | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  recusada: [];
}>();

const solicitacoes = useCalendarioSolicitacaoMudanca();
const saving = ref(false);

const { handleSubmit, resetForm } = useForm({
  validationSchema: recusarSolicitacaoSchema,
  initialValues: recusarSolicitacaoSchema.getDefault(),
});

watch(
  () => props.modelValue,
  open => {
    if (open) resetForm({ values: recusarSolicitacaoSchema.getDefault() });
  }
);

const confirmRecusar = handleSubmit(async formValues => {
  if (!props.solicitacaoId) return;

  saving.value = true;
  try {
    await solicitacoes.recusar(props.solicitacaoId, {
      motivoRecusa: formValues.motivoRecusa || null,
    });
    await solicitacoes.invalidate();

    emit('recusada');
    emit('update:modelValue', false);
  } finally {
    saving.value = false;
  }
});

function close() {
  emit('update:modelValue', false);
}
</script>

<template>
  <DialogSkeleton
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <DialogModalBaseLayout
      v-if="modelValue"
      title="Recusar solicitação"
      :close-button="true"
      :on-close="close"
    >
      <form class="flex flex-col gap-4" @submit.prevent="confirmRecusar">
        <TextareaField
          name="motivoRecusa"
          label="Motivo da recusa"
          placeholder="Opcional"
        />
      </form>

      <template #button-group>
        <button
          type="button"
          class="rounded-lg border border-ldsa-grey/30 px-4 py-2 text-sm font-medium"
          @click="close"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="rounded-lg bg-ldsa-red px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          :disabled="saving"
          @click="confirmRecusar"
        >
          Recusar
        </button>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
