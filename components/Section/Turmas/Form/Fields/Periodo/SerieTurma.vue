<script setup lang="ts">
import { useTurmaForm } from '../../-Helpers/context';

const { values: formValues } = useTurmaForm();

const serie = computed({
  get: () => formValues.periodo,
  set: (value) => {
    formValues.periodo = value;
  },
});

const letra = computed({
  get: () => formValues.periodo,
  set: (value) => {
    formValues.periodo = value;
  },
});
</script>

<template>
  <div class="grid grid-cols-[2fr,1fr] gap-4">
    <VVTextField
      type="text"
      name="serie"
      label="Série"
      v-model="serie"
      placeholder="1°, 2°, 3°..."
    />

    <VVTextField
      type="text"
      name="letra"
      label="Letra"
      v-model="letra"
      placeholder="A, B, C..."
    />
  </div>
</template>
