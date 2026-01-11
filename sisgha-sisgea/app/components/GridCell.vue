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

const underAnotherElementDragging = ref(false);

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
      onDrag: () => (underAnotherElementDragging.value = true),
      onDragLeave: () => (underAnotherElementDragging.value = false),
      onDrop: () => (underAnotherElementDragging.value = false),
    })
  );
});

onUnmounted(() => {
  cleanup();
});

defineEmits(['edit-cell']);

const popoverOpen = ref(false);
</script>

<template>
  <div
    ref="el2"
    v-show="showBreaks ? true : cellInfo.type !== 'intervalo'"
    class="font-medium border-b-2 border-b-ldsa-text-default/55 text-ldsa-text-default/95 last:border-b-0 min-h-6 max-lg:h-12"
  >
    <div
      ref="el"
      id="cell"
      class="py-0.5 text-center text-[0.813rem] h-full relative"
      :class="[
        underAnotherElementDragging &&
          cellInfo.type !== 'intervalo' &&
          'bg-ldsa-green-2/15 text-ldsa-green-1',
        cellInfo.type === 'intervalo' &&
          'bg-ldsa-grey/15 text-ldsa-text-default/55',
      ]"
    >
      <span
        class="max-w-full whitespace-normal break-word lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis h-full flex items-center justify-center"
        v-if="cellInfo.type === 'intervalo'"
      >
        Intervalo
      </span>

      <span
        v-else-if="cellInfo.type === 'vago'"
        class="h-full flex items-center justify-center"
        >-</span
      >

      <span
        v-else-if="cellInfo.type === 'aula'"
        class="max-w-full whitespace-normal break-word lg:whitespace-nowrap overflow-hidden lg:text-ellipsis lg:line-clamp-1 max-lg:line-clamp-2 max-lg:pt-0.5"
      >
        {{ cellInfo.diario.disciplina }} - {{ cellInfo.diario.professor }}
      </span>

      <span
        v-if="cellInfo.type !== 'intervalo' && editMode"
        :class="[
          'absolute right-0 top-1/2 transform -translate-y-1/2 max-lg:h-11 bg-ldsa-bg',
          !popoverOpen && 'hover',
        ]"
      >
        <SectionHorarioDapeEditGridCellEditButtons
          v-model="cellInfo"
          v-model:popover="popoverOpen"
          @atividade-change="$emit('edit-cell')"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.hover {
  display: none;
}

#cell:hover > .hover {
  display: inline;
}
</style>
