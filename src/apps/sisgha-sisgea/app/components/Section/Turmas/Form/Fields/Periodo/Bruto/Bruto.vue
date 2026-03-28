<script lang="ts" setup>
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
    :disabled="isLoading || disabled"
    label="Período"
    name="periodo"
    placeholder="1° Período, 2° Período, 3° Período..."
    type="text"
    v-bind="$attrs"
  />
</template>
