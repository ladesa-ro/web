<script lang="ts" setup>
import { VVStepper, type VVStepperProps } from '@ladesa-ro/web.ui';

defineProps<VVStepperProps>();
</script>

<template>
  <VVStepper v-bind="$props" />
</template>
