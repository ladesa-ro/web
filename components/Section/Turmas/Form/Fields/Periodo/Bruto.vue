<script setup lang="ts">
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
