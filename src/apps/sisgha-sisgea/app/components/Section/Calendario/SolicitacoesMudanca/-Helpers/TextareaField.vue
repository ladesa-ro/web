<script lang="ts" setup>
import { VVTextareaField, type VVTextareaFieldProps } from '@ladesa-ro/web.ui';

defineProps<VVTextareaFieldProps>();
</script>

<template>
  <VVTextareaField v-bind="$props" />
</template>
