<script lang="ts" setup>
import { CalendarMonth, type CalendarMonthProps } from '@ladesa-ro/web.ui';

defineProps<CalendarMonthProps>();
</script>

<template>
  <CalendarMonth v-bind="$props" />
</template>
