<script setup lang="ts">
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';

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
    v-show="showBreaks ? true : cellInfo.type !== 'intervalo'"
    ref="el2"
    class="grid-cell-row u-font-medium"
  >
    <div
      id="cell"
      ref="el"
      class="grid-cell u-py-0-5 u-text-center u-h-full u-relative"
      :class="[
        underAnotherElementDragging &&
          cellInfo.type !== 'intervalo' &&
          'grid-cell--dragging-over',
        cellInfo.type === 'intervalo' && 'grid-cell--intervalo',
      ]"
    >
      <span
        v-if="cellInfo.type === 'intervalo'"
        class="grid-cell__label grid-cell__label--intervalo u-h-full u-flex u-items-center u-justify-center"
      >
        Intervalo
      </span>

      <span
        v-else-if="cellInfo.type === 'vago'"
        class="u-h-full u-flex u-items-center u-justify-center"
        >-</span
      >

      <span
        v-else-if="cellInfo.type === 'aula'"
        class="grid-cell__label grid-cell__label--aula"
      >
        {{ cellInfo.diario.disciplina }} - {{ cellInfo.diario.professor }}
      </span>

      <span
        v-if="cellInfo.type !== 'intervalo' && editMode"
        class="grid-cell__edit-buttons u-absolute"
        :class="[!popoverOpen && 'hover']"
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
.grid-cell-row {
  border-bottom: 2px solid
    rgb(from var(--ladesa-text-default-color) R G B / 55%);
  color: rgb(from var(--ladesa-text-default-color) R G B / 95%);
  min-height: 1.5rem;
}

.grid-cell-row:last-child {
  border-bottom: 0;
}

@media (max-width: 1023.98px) {
  .grid-cell-row {
    height: 3rem;
  }
}

.grid-cell {
  font-size: 0.813rem;
}

.grid-cell--dragging-over {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 15%);
  color: var(--ladesa-green-1-color);
}

.grid-cell--intervalo {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
  color: rgb(from var(--ladesa-text-default-color) R G B / 55%);
}

.grid-cell__label {
  max-width: 100%;
  overflow: hidden;
}

.grid-cell__label--intervalo {
  white-space: normal;
  overflow-wrap: break-word;
}

@media (min-width: 1024px) {
  .grid-cell__label--intervalo {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.grid-cell__label--aula {
  white-space: normal;
  overflow-wrap: break-word;
}

@media (max-width: 1023.98px) {
  .grid-cell__label--aula {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-top: 0.125rem;
  }
}

@media (min-width: 1024px) {
  .grid-cell__label--aula {
    white-space: nowrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}

.grid-cell__edit-buttons {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--ladesa-background-color);
}

@media (max-width: 1023.98px) {
  .grid-cell__edit-buttons {
    height: 2.75rem;
  }
}

.hover {
  display: none;
}

#cell:hover > .hover {
  display: inline;
}
</style>
