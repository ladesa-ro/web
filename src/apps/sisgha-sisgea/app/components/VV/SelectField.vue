<script lang="ts" setup>
import { VVSelectField, type VVSelectFieldProps } from '@ladesa-ro/web.ui';

defineProps<VVSelectFieldProps>();
</script>

<template>
  <VVSelectField v-bind="$props" />
</template>
