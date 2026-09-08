<script lang="ts" setup>
import { VVTextField, type VVTextFieldProps } from '@ladesa-ro/web.ui';

defineProps<VVTextFieldProps>();
</script>

<template>
  <VVTextField v-bind="$props" />
</template>
