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

const { handle: handleWriteError, conflictMessage, clearConflictMessage } =
  useApiWriteErrorHandler();

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
      <p class="text-sm text-ldsa-grey">
        Adiciona uma ocorrência extra a esta série recorrente, fora da regra
        de repetição definida.
      </p>

      <p
        v-if="conflictMessage"
        class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 rounded-md p-3"
      >
        {{ conflictMessage }}
      </p>

      <UIFormTextField
        v-model="dataOcorrencia"
        type="date"
        name="dataOcorrenciaAvulsa"
        label="Data da ocorrência"
      />

      <div class="flex gap-4">
        <div class="flex-1">
          <UIFormTimeField v-model="horarioInicio" label="Horário inicial" />
        </div>
        <div class="flex-1">
          <UIFormTimeField v-model="horarioFim" label="Horário final" />
        </div>
      </div>

      <template #button-group>
        <UIButtonModalCancel type="close" class="flex w-full" @click="cancel" />
        <UIButtonModalConfirm
          type="submit"
          class="flex w-full"
          :disabled="isSubmitting || !dataOcorrencia"
          @click="submit"
        />
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
