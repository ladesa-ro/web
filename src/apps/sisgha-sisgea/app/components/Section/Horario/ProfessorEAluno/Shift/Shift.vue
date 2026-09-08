<script lang="ts" setup>
import { ScheduleShift, type ScheduleShiftProps } from '@ladesa-ro/web.ui';

defineProps<ScheduleShiftProps>();
</script>

<template>
  <ScheduleShift v-bind="$props" />
</template>
