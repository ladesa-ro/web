<script lang="ts" setup>
import { ScheduleGrid, type ScheduleGridProps } from '@ladesa-ro/web.ui';

defineProps<ScheduleGridProps>();
</script>

<template>
  <ScheduleGrid v-bind="$props" />
</template>
