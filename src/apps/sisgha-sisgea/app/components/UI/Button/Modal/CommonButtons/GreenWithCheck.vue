<script setup lang="ts">
import { ButtonModalGreenWithCheck } from '@ladesa-ro/web.ui';

defineProps<{ text: string }>();
</script>

<template>
  <ButtonModalGreenWithCheck v-bind="$props" />
</template>
