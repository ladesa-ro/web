<script lang="ts" setup>
import ModalBaseLayout from '../../../../Dialog/Modal/ModalBaseLayout.vue';

const props = defineProps<{
  modelValue: boolean;
  defaultDataInicio?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm', payload: { dataInicio: string; dataFim: string | null }): void;
  (e: 'close'): void;
}>();

const dayjs = useDayJs();

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => (isOpen.value = val)
);
watch(isOpen, val => emit('update:modelValue', val));

const today = dayjs().format('YYYY-MM-DD');

type Tipo = 'permanente' | 'temporario';

const tipo = ref<Tipo>('permanente');
const dataInicio = ref(props.defaultDataInicio ?? today);
const dataFim = ref('');

const toggleItems = [
  { text: 'Permanente', value: 'permanente' },
  { text: 'Temporario', value: 'temporario' },
];

const isDataInicioValid = computed(() => {
  return dataInicio.value !== '' && dataInicio.value >= today;
});

const isDataFimValid = computed(() => {
  if (tipo.value === 'permanente') return true;
  return dataFim.value !== '' && dataFim.value >= dataInicio.value;
});

const isFormValid = computed(() => {
  return isDataInicioValid.value && isDataFimValid.value;
});

function cancel() {
  isOpen.value = false;
  emit('close');
}

function confirm() {
  if (!isFormValid.value) return;

  emit('confirm', {
    dataInicio: dataInicio.value,
    dataFim: tipo.value === 'temporario' ? dataFim.value : null,
  });

  isOpen.value = false;
}
</script>

<template>
  <DialogSkeleton v-model="isOpen">
    <ModalBaseLayout
      v-if="isOpen"
      title="Confirmar disponibilidade"
      :close-button="true"
      :on-close="cancel"
      class="!sm:max-w-[38rem]"
    >
      <div class="flex flex-col gap-5">
        <!-- Toggle: Permanente / Temporario -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-medium text-ldsa-text-default">
            Tipo de disponibilidade
          </label>
          <UIToggle v-model="tipo" :items="toggleItems" />
        </div>

        <!-- Data inicio -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-ldsa-text-default">
            Data de inicio
          </label>
          <input
            v-model="dataInicio"
            type="date"
            :min="today"
            class="date-input"
          >
          <p v-if="dataInicio && !isDataInicioValid" class="text-xs text-red-500">
            A data de inicio nao pode ser no passado.
          </p>
        </div>

        <!-- Data fim (only if temporario) -->
        <div v-if="tipo === 'temporario'" class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-ldsa-text-default">
            Data de fim
          </label>
          <input
            v-model="dataFim"
            type="date"
            :min="dataInicio || today"
            class="date-input"
          >
          <p v-if="dataFim && !isDataFimValid" class="text-xs text-red-500">
            A data de fim deve ser igual ou posterior a data de inicio.
          </p>
        </div>
      </div>

      <template #button-group>
        <UIButtonModalCancel
          type="close"
          class="flex flex-1"
          @click="cancel"
        />

        <UIButtonModalCommonButtonsGreenWithCheck
          text="Confirmar"
          class="flex-1"
          :disabled="!isFormValid"
          @click.prevent="confirm"
        />
      </template>
    </ModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.date-input {
  @apply border-2 border-ldsa-grey rounded-lg px-3 py-2 text-sm
         text-ldsa-text-default bg-ldsa-bg
         focus:outline-none focus:border-ldsa-green-1
         transition-colors duration-200;
}
</style>
