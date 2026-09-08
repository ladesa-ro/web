<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  eventId: string;
  version: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}>();

const agendamento = useCalendarioAgendamento();

const {
  handle: handleWriteError,
  conflictMessage,
  clearConflictMessage,
} = useApiWriteErrorHandler();

const isOpen = ref(props.modelValue);
const isSubmitting = ref(false);
const dataOcorrencia = ref('');
const horarioInicio = ref<string | null>(null);
const horarioFim = ref<string | null>(null);

watch(
  () => props.modelValue,
  val => {
    isOpen.value = val;
    if (val) {
      dataOcorrencia.value = '';
      horarioInicio.value = null;
      horarioFim.value = null;
      clearConflictMessage();
    }
  }
);

watch(isOpen, val => emit('update:modelValue', val));

function cancel() {
  isOpen.value = false;
}

async function submit() {
  if (!dataOcorrencia.value) return;

  isSubmitting.value = true;
  clearConflictMessage();

  try {
    await agendamento.adicionarDataAvulsa(
      props.eventId,
      {
        dataOcorrencia: dataOcorrencia.value,
        horarioInicio: horarioInicio.value ?? undefined,
        horarioFim: horarioFim.value ?? undefined,
      },
      props.version
    );

    await agendamento.invalidate();
    isOpen.value = false;
    emit('success');
  } catch (err) {
    const handled = await handleWriteError(err);
    if (!handled) throw err;
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <DialogSkeleton v-model="isOpen">
    <DialogModalBaseLayout
      v-if="isOpen"
      title="Adicionar data avulsa"
      :close-button="true"
      :on-close="cancel"
    >
      <p class="u-text-sm add-occurrence-modal__description">
        Adiciona uma ocorrência extra a esta série recorrente, fora da regra de
        repetição definida.
      </p>

      <p
        v-if="conflictMessage"
        class="u-text-sm u-rounded-md u-p-3 add-occurrence-modal__conflict"
      >
        {{ conflictMessage }}
      </p>

      <UIFormTextField
        v-model="dataOcorrencia"
        type="date"
        name="dataOcorrenciaAvulsa"
        label="Data da ocorrência"
      />

      <div class="u-flex u-gap-4">
        <div class="u-flex-1">
          <UIFormTimeField v-model="horarioInicio" label="Horário inicial" />
        </div>
        <div class="u-flex-1">
          <UIFormTimeField v-model="horarioFim" label="Horário final" />
        </div>
      </div>

      <template #button-group>
        <UIButtonModalCancel
          type="close"
          class="u-flex u-w-full"
          @click="cancel"
        />
        <UIButtonModalConfirm
          type="submit"
          class="u-flex u-w-full"
          :disabled="isSubmitting || !dataOcorrencia"
          @click="submit"
        />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
.add-occurrence-modal__description {
  color: var(--ladesa-grey-color);
}

.add-occurrence-modal__conflict {
  color: var(--ladesa-red-color);
  background-color: rgb(from var(--ladesa-red-color) R G B / 10%);
}
</style>
