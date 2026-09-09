<script lang="ts" setup>
import { VVCheckboxField, type VVCheckboxFieldProps } from '@ladesa-ro/web.ui';

defineProps<VVCheckboxFieldProps>();
</script>

<template>
  <VVCheckboxField v-bind="$props" />
</template>
