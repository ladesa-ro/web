<script lang="ts" setup>
import {
  ScheduleHeaderDays,
  type ScheduleHeaderDaysProps,
} from '@ladesa-ro/web.ui';

defineProps<ScheduleHeaderDaysProps>();
</script>

<template>
  <ScheduleHeaderDays v-bind="$props" />
</template>
