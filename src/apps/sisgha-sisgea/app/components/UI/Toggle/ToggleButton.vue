<script setup lang="ts">
import { ToggleButton, type ToggleButtonProps } from '@ladesa-ro/web.ui';

defineProps<ToggleButtonProps>();
</script>

<template>
  <ToggleButton v-bind="$props" />
</template>
