<script setup lang="ts">
import { useTurmaFormValues } from '../../-Helpers/context';

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
};

defineProps<Props>();

const formValues = useTurmaFormValues();

const serie = computed({
  get: () => {
    return formValues.value.periodo;
  },

  set: (value) => {
    formValues.value.periodo = value;
  },
});

const letra = computed({
  get: () => {
    return formValues.value.periodo;
  },
  set: (value) => {
    formValues.value.periodo = value;
  },
});
</script>

<template>
  <div class="grid grid-cols-[2fr,1fr] gap-4">
    <VVTextField
      type="text"
      name="serie"
      label="Série"
      :disabled="isLoading || disabled"
      v-model="serie"
      placeholder="1°, 2°, 3°..."
    />

    <VVTextField
      type="text"
      name="letra"
      :disabled="isLoading || disabled"
      label="Letra"
      v-model="letra"
      placeholder="A, B, C..."
    />
  </div>
</template>
