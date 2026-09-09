<script lang="ts" setup>
import { VVRadioGroup, type VVRadioGroupProps } from '@ladesa-ro/web.ui';

defineProps<VVRadioGroupProps>();
</script>

<template>
  <VVRadioGroup v-bind="$props" />
</template>
