<script setup lang="ts">
type Props = {
  disabled?: boolean;
  isLoading?: boolean;
};

defineProps<Props>();
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
