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
}>();

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);

const cellInfo = defineModel<Cell>({
  default: {},
  required: true,
});

const draggableElement = useTemplateRef('el');
const droppableElement = useTemplateRef('el2');

let cleanup = () => {};

const draggingAgora = ref(false);

onMounted(() => {
  if (!draggableElement.value || !droppableElement.value) {
    return;
  }

  cleanup = combine(
    draggable({
      element: draggableElement.value,
      canDrag: () => cellInfo.value.type !== 'intervalo' && editMode.value,
      getInitialData: () => ({
        ...cellInfo.value,
        ...props,
      }),
    }),

    //

    dropTargetForElements({
      element: droppableElement.value,
      canDrop: ({ source }) =>
        source.data.id !== cellInfo.value.id &&
        cellInfo.value.type !== 'intervalo' &&
        editMode.value,
      getData: () => ({
        ...cellInfo.value,
        ...props,
      }),
      onDrag: ({ self }) => {
        draggingAgora.value = true;
      },
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
    v-show="showBreaks ? true : cellInfo.type !== 'intervalo'"
    class="font-medium border-b-2 border-b-ldsa-text-default/55 text-ldsa-text-default/95 last:border-b-0 min-h-6 max-lg:h-12"
  >
    <div
      ref="el"
      class="py-0.5 text-center text-[0.813rem] h-full"
      :class="[
        draggingAgora &&
          cellInfo.type !== 'intervalo' &&
          'bg-ldsa-green-2/15 text-ldsa-green-1',
        cellInfo.type === 'intervalo' &&
          'bg-ldsa-grey/15 text-ldsa-text-default/55',
      ]"
    >
      <span
        class="block max-w-full whitespace-normal break-word lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis lg:line-clamp-1 max-lg:line-clamp-2"
        v-if="cellInfo.type === 'intervalo'"
      >
        Intervalo
      </span>

      <span v-else-if="cellInfo.type === 'vago'">-</span>

      <span
        v-else-if="cellInfo.type === 'aula'"
        class="block max-w-full whitespace-normal break-word lg:whitespace-nowrap overflow-hidden lg:text-ellipsis lg:line-clamp-1 max-lg:line-clamp-2"
      >
        {{ cellInfo.diario.disciplina }} - {{ cellInfo.diario.professor }}
      </span>

      <!-- TODO: adicionar botoes para edicao da celula -->
    </div>
  </div>
</template>
