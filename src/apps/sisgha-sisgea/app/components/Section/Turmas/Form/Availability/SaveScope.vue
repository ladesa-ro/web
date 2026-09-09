<script lang="ts" setup>
import ModalBaseLayout from '../../../../Dialog/Modal/ModalBaseLayout.vue';

const props = defineProps<{
  defaultDataInicio?: string;
}>();

const emit = defineEmits<{
  (e: 'confirm', payload: { dataInicio: string; dataFim: string | null }): void;
  (e: 'close'): void;
}>();

const dayjs = useDayJs();

const today = dayjs().format('YYYY-MM-DD');

type Tipo = 'permanente' | 'temporario';

const tipo = ref<Tipo>('permanente');
const dataInicio = ref(props.defaultDataInicio ?? today);
const dataFim = ref('');

const toggleItems = [
  { text: 'Permanente', value: 'permanente' },
  { text: 'Temporário', value: 'temporario' },
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
  emit('close');
}

function confirm() {
  if (!isFormValid.value) return;

  emit('confirm', {
    dataInicio: dataInicio.value,
    dataFim: tipo.value === 'temporario' ? dataFim.value : null,
  });
}
</script>

<template>
  <ModalBaseLayout
    title="Confirmar disponibilidade"
    :close-button="true"
    :on-close="cancel"
    class="save-scope-layout"
  >
    <div class="u-flex u-flex-col u-gap-5">
      <div class="u-flex u-flex-col u-gap-2">
        <label class="field-label u-text-xs u-font-medium">
          Tipo de disponibilidade
        </label>
        <UIToggle v-model="tipo" :items="toggleItems" />
      </div>

      <div class="u-flex u-flex-col u-gap-1-5">
        <label class="field-label u-text-xs u-font-medium">
          Data de inicio
        </label>
        <input
          v-model="dataInicio"
          type="date"
          :min="today"
          class="date-input"
        />
        <p
          v-if="dataInicio && !isDataInicioValid"
          class="field-error u-text-xs"
        >
          A data de inicio nao pode ser no passado.
        </p>
      </div>

      <div v-if="tipo === 'temporario'" class="u-flex u-flex-col u-gap-1-5">
        <label class="field-label u-text-xs u-font-medium"> Data de fim </label>
        <input
          v-model="dataFim"
          type="date"
          :min="dataInicio || today"
          class="date-input"
        />
        <p v-if="dataFim && !isDataFimValid" class="field-error u-text-xs">
          A data de fim deve ser igual ou posterior a data de inicio.
        </p>
      </div>
    </div>

    <template #button-group>
      <UIButtonModalCancel type="close" @click="cancel" />

      <UIButtonModalCommonButtonsGreenWithCheck
        text="Confirmar"
        :disabled="!isFormValid"
        @click.prevent="confirm"
      />
    </template>
  </ModalBaseLayout>
</template>

<style scoped>
@media (min-width: 40rem) {
  .save-scope-layout {
    max-width: 38rem !important;
  }
}

.field-label {
  color: var(--ladesa-text-default-color);
}

.field-error {
  color: var(--ladesa-red-color);
}

.date-input {
  border: 2px solid var(--ladesa-grey-color);
  border-radius: var(--ui-radius-lg);
  padding-inline: var(--ui-space-3);
  padding-block: var(--ui-space-2);
  font-size: 0.875rem;
  color: var(--ladesa-text-default-color);
  background-color: var(--ladesa-background-color);
  transition:
    border-color var(--ui-duration-base) var(--ui-easing-standard),
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    color var(--ui-duration-base) var(--ui-easing-standard);
}

.date-input:focus {
  outline: none;
  border-color: var(--ladesa-green-1-color);
}
</style>
