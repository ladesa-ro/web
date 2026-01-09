<script setup lang="ts">
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '../composables/schedule/edit/useScheduleEditTypes';

const props = defineProps<{
  cellIndex: number;
  shiftName: string;
  shiftIndex: number;
  dayDate: string;
  editMode?: boolean;
}>();

const cellInfo = defineModel<Cell>({
  default: {},
  required: true,
});

const draggableElement = useTemplateRef('el');
const droppableElement = useTemplateRef('el2');

let cleanup = () => {};

const draggingAgora = ref(false);

onMounted(() => {
  // cellInfo.value.cellIndex = props.cellIndex;
  // cellInfo.value.shiftName = props.shiftName;
  // cellInfo.value.shiftIndex = props.shiftIndex;
  // cellInfo.value.dayDate = props.dayDate;

  if (!draggableElement.value || !droppableElement.value) {
    return;
  }

  cleanup = combine(
    draggable({
      element: draggableElement.value,
      canDrag: () => cellInfo.value.type !== 'intervalo' && props.editMode,
      getInitialData: () => ({ ...cellInfo.value, ...props }),
    }),

    //

    dropTargetForElements({
      element: droppableElement.value,
      canDrop: ({ source }) =>
        source.data.id !== cellInfo.value.id &&
        cellInfo.value.type !== 'intervalo' &&
        props.editMode,
      getData: () => ({ ...cellInfo.value, ...props }),
      onDrag: () => (draggingAgora.value = true),
      onDragLeave: () => (draggingAgora.value = false),
      onDrop: () => (draggingAgora.value = false),
    })
  );
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div
    ref="el2"
    class="font-medium border-b-2 border-b-ldsa-text-default/55 text-ldsa-text-default/95 last:border-b-0 min-h-6"
  >
    <div
      ref="el"
      class="py-0.5 text-center text-[0.813rem] h-full"
      :class="[
        draggingAgora &&
          cellInfo.type !== 'intervalo' &&
          'bg-ldsa-green-2/30 text-ldsa-green-1',
        cellInfo.type === 'intervalo' && 'bg-ldsa-grey/15 text-ldsa-black/60',
      ]"
    >
      <span v-if="cellInfo.type === 'intervalo'">Intervalo</span>

      <span v-else-if="cellInfo.type === 'vago'">-</span>

      <span v-else-if="cellInfo.type === 'aula'" class="block truncate max-w-full">
        {{ cellInfo.diario.disciplina }} - {{ cellInfo.diario.professor }}
      </span>
    </div>
  </div>
</template>
