<script setup lang="ts">
import { CheckboxSquare, type CheckboxSquareProps } from '@ladesa-ro/web.ui';

defineProps<CheckboxSquareProps>();
</script>

<template>
  <CheckboxSquare v-bind="$props" />
</template>
