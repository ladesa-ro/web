<script lang="ts" setup>
import { VVTimeField, type VVTimeFieldProps } from '@ladesa-ro/web.ui';

defineProps<VVTimeFieldProps>();
</script>

<template>
  <VVTimeField v-bind="$props" />
</template>
