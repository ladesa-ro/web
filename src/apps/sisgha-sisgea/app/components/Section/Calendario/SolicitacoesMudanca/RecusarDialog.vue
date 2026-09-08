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
      <form class="u-flex u-flex-col u-gap-4" @submit.prevent="confirmRecusar">
        <TextareaField
          name="motivoRecusa"
          label="Motivo da recusa"
          placeholder="Opcional"
        />
      </form>

      <template #button-group>
        <UIButtonModalCancel @click="close" />
        <UIButtonModalBaseLayout
          text="Recusar"
          color="var(--ladesa-red-color)"
          type="button"
          :disabled="saving"
          @click="confirmRecusar"
        >
          <IconsExclude />
        </UIButtonModalBaseLayout>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

