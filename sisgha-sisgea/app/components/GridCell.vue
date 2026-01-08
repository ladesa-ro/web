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
  required: false,
});

const draggableElement = useTemplateRef('el');
const droppableElement = useTemplateRef('el2');

let cleanup = () => {};

const draggingAgora = ref(false);

onMounted(() => {
  cellInfo.value.cellIndex = props.cellIndex;
  cellInfo.value.shiftName = props.shiftName;
  cellInfo.value.shiftIndex = props.shiftIndex;
  cellInfo.value.dayDate = props.dayDate;

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
    class="border-b-2 last:border-b-0 border-b-ldsa-grey/50 min-h-6"
  >
    <div
      ref="el"
      class="last:border-b-0 py-0.5 text-center text-[0.813rem] h-full"
      :class="[
        draggingAgora &&
          cellInfo.type !== 'intervalo' &&
          'bg-ldsa-green-2/30 text-ldsa-green-1',
        draggingAgora &&
          cellInfo.type === 'intervalo' &&
          'bg-ldsa-red/30 text-ldsa-red',
        cellInfo.type === 'intervalo' && 'bg-ldsa-grey/15 text-ldsa-black/60',
      ]"
    >
      <span v-if="cellInfo.type === 'intervalo'">Intervalo</span>

      <span v-else-if="cellInfo.type === 'vago'">-</span>

      <span v-else-if="cellInfo.type === 'aula'">
        {{ cellInfo.diario.disciplina }} - {{ cellInfo.diario.professor }}
      </span>
    </div>
  </div>
</template>
