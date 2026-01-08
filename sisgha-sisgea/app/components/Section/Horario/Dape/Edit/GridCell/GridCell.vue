<script setup lang="ts">
import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';

const { shiftIndex, dayIndex, editMode } = defineProps<{
  dayIndex: number;
  shiftIndex: number;
  editMode?: boolean;
}>();

const cellInfo = defineModel<Cell>({
  default: {},
  required: true,
});

const cellRef = useTemplateRef('cell');
const cellWrap = useTemplateRef('cell-wrap');

let cleanup = () => {};

onMounted(() => {
  if (!cellRef.value || !cellWrap.value) {
    return;
  }

  cleanup = combine(
    draggable({
      element: cellRef.value,

      canDrag: () => cellInfo.value.type !== 'intervalo' && editMode,

      getInitialData: () => ({
        ...cellInfo.value,
        dayIndex,
        shiftIndex,
        dndType: 'cellDraggable',
      }),

      onDrag: () => {
        cellRef.value?.classList.add('dragging');
      },

      onDrop: () => {
        cellRef.value?.classList.remove('dragging');
      },
    }),

    dropTargetForElements({
      element: cellRef.value,

      getData: () => ({
        ...cellInfo.value,
        type: 'cellDropTarget',
      }),

      getIsSticky: () => true,
    })
  );
});

onUnmounted(() => {
  cleanup();
});

//

defineEmits(['atividade-change']);

const showBreaks = inject('showBreaks');

const popoverOpen = ref(false);
</script>

<template>
  <div
    ref="cell-wrap"
    v-show="showBreaks ? true : cellInfo.type !== 'intervalo'"
    class="cell-wrap"
  >
    <div
      ref="cell"
      id="horario"
      class="horario"
      :class="{
        'bg-ldsa-grey/20': cellInfo.type === 'intervalo',
      }"
    >
      <span v-if="cellInfo.type === 'aula'" class="truncate max-w-19/20">
        {{ cellInfo.diario?.disciplina }} - {{ cellInfo.diario?.turma }}
      </span>

      <span v-else-if="cellInfo.type === 'vago'"> - </span>

      <span
        v-else-if="cellInfo.type === 'intervalo'"
        class="text-ldsa-text-default/50"
      >
        Intervalo
      </span>

      <span
        v-if="cellInfo.type !== 'intervalo'"
        :class="[
          'absolute right-1 pl-1',
          !popoverOpen && 'hover',
        ]"
      >
        <SectionHorarioDapeEditGridCellEditButtons
          v-if="editMode"
          v-model="cellInfo"
          v-model:popover="popoverOpen"
          @atividade-change="$emit('atividade-change')"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
.dragging {
  opacity: 0.15;
}

.hover {
  display: none;
}

#horario:hover > .hover {
  display: inline;
}
</style>

<style scoped src="./gridCell.css"></style>
