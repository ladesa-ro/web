<script lang="ts" setup>
import { VVDateField, type VVDateFieldProps } from '@ladesa-ro/web.ui';

defineProps<VVDateFieldProps>();
</script>

<template>
  <VVDateField v-bind="$props" />
</template>
