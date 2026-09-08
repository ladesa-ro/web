<script lang="ts" setup>
import { ShiftTimes, type ShiftTimesProps } from '@ladesa-ro/web.ui';

defineProps<ShiftTimesProps>();

const emit = defineEmits(['update:selectedTimes']);
</script>

<template>
  <ShiftTimes
    v-bind="$props"
    @update:selected-times="value => emit('update:selectedTimes', value)"
  />
</template>
