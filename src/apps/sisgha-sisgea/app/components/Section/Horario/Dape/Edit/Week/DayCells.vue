<script lang="ts" setup>
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import type { ShiftName } from '~/utils/schedule/types';
import GridCell from '../GridCell/GridCell.vue';

defineProps<{
  shiftName: ShiftName;
  shiftIndex: number;
  dayDate: string;
}>();

const cells = defineModel<Cell[]>({ required: true });

defineEmits<{ 'edit-cell': [] }>();
</script>

<template>
  <div>
    <GridCell
      v-for="(cell, cellIndex) in cells"
      :key="cell.id"
      v-model="cells[cellIndex]!"
      :cell-index="cellIndex"
      :shift-name="shiftName"
      :shift-index="shiftIndex"
      :day-date="dayDate"
      @edit-cell="$emit('edit-cell')"
    />
  </div>
</template>
