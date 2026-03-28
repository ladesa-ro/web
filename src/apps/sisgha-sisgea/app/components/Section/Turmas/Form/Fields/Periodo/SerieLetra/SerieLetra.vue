<script lang="ts" setup>
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
  <div class="grid grid-cols-[2fr_1fr] gap-4">
    <VVTextField
      v-model="serie"
      :disabled="isLoading || disabled"
      label="Série"
      name="_.serie"
      placeholder="1°, 2°, 3°..."
      type="text"
    />

    <VVTextField
      v-model="letra"
      :disabled="isLoading || disabled"
      label="Letra"
      name="_.letra"
      placeholder="A, B, C..."
      type="text"
    />
  </div>
</template>
