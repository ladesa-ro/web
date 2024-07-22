<script setup lang="ts">
import { useField } from 'vee-validate';

defineProps({
  disabled: {
    type: Boolean,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
  },
});

const { value: modoPeriodo } = useField('_.modoPeriodo');

onMounted(() => {
  modoPeriodo.value = 'periodo';
});
</script>

<template>
  <VVTextField
    type="text"
    name="periodo"
    label="Período"
    :disabled="isLoading || disabled"
    placeholder="1° Período, 2° Período, 3° Período..."
    v-bind="$attrs"
  />
</template>
