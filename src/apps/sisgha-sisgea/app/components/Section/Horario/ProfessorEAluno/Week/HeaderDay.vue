<script lang="ts" setup>
import {
  ScheduleHeaderDay,
  type ScheduleHeaderDayProps,
} from '@ladesa-ro/web.ui';

defineProps<ScheduleHeaderDayProps>();
</script>

<template>
  <ScheduleHeaderDay v-bind="$props" />
</template>
