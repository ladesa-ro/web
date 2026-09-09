<script lang="ts" setup>
import { DaySquare, type DaySquareProps } from '@ladesa-ro/web.ui';

defineProps<DaySquareProps>();
</script>

<template>
  <DaySquare v-bind="$props" />
</template>
