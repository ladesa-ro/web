<script lang="ts" setup>
import { ScheduleShifts, type ScheduleShiftsProps } from '@ladesa-ro/web.ui';

defineProps<ScheduleShiftsProps>();
</script>

<template>
  <ScheduleShifts v-bind="$props" />
</template>
