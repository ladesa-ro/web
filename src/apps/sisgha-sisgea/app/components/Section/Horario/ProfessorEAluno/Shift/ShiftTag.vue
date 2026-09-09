<script lang="ts" setup>
import {
  ScheduleShiftTag,
  type ScheduleShiftTagProps,
} from '@ladesa-ro/web.ui';

defineProps<ScheduleShiftTagProps>();
</script>

<template>
  <ScheduleShiftTag v-bind="$props" />
</template>
