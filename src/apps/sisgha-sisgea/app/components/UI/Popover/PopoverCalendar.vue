<script setup lang="ts">
import { PopoverCalendar } from '@ladesa-ro/web.ui';
import type { Dayjs } from 'dayjs';

const open = defineModel<boolean>({ required: true, default: false });

defineProps<{
  selectedDay?: Dayjs;
}>();

const emit = defineEmits<{
  select: [day: Dayjs];
}>();
</script>

<template>
  <PopoverCalendar v-model="open" :selected-day="selectedDay" @select="day => emit('select', day)">
    <slot />
  </PopoverCalendar>
</template>
