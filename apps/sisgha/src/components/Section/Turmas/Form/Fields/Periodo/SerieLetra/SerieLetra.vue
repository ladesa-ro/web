<script setup lang="ts">
import { useField } from 'vee-validate';
import { useSplittedSerieLetra } from './composables/useSplittedSerieLetra';

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
};

defineProps<Props>();

const { value: formPeriodo } = useField<string>('periodo');

const { value: formSerie } = useField<string>('_.serie');
const { value: formLetra } = useField<string>('_.letra');

const { serie, letra } = useSplittedSerieLetra(formPeriodo);

watch(
  [serie, letra],
  ([serie, letra]) => {
    formSerie.value = serie;
    formLetra.value = letra;
  },
  { immediate: true }
);

const { value: modoPeriodo } = useField('_.modoPeriodo');

onMounted(() => {
  requestIdleCallback(() => {
    modoPeriodo.value = 'serie-letra';
  });
});
</script>

<template>
  <div class="grid grid-cols-[2fr,1fr] gap-4">
    <VVTextField
      type="text"
      name="_.serie"
      :disabled="isLoading || disabled"
      v-model="serie"
      label="Série"
      placeholder="1°, 2°, 3°..."
    />

    <VVTextField
      type="text"
      name="_.letra"
      :disabled="isLoading || disabled"
      label="Letra"
      v-model="letra"
      placeholder="A, B, C..."
    />
  </div>
</template>
