<script setup lang="ts">
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';
import {
  useSelectedCells,
  type ActiveCell,
} from '~/composables/schedule/edit/useSelectedScheduleCells';

const {
  cellIndex,
  shiftIndex,
  dayIndex,
  maxCapacityReached = false,
  editMode,
} = defineProps<{
  cellIndex: number;
  dayIndex: number;
  shiftIndex: number;
  editMode?: boolean;
  maxCapacityReached?: boolean;
}>();

const cellInfo = defineModel<Cell>({
  default: {},
  required: true,
});

const cellRef = useTemplateRef('cell');
const cellWrap = useTemplateRef('cell-wrap');

//

type Status = 'idle' | 'dragging' | 'draggingAndHovering';
type ClosestEdge = Edge | null;

type DropTargetState = { status: Status; closestEdge: ClosestEdge };

const dropTargState: Ref<DropTargetState> = ref({
  status: 'idle',
  closestEdge: null,
});

//

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

      getData: ({ input, element }) =>
        attachClosestEdge(
          { ...cellInfo.value, type: 'cellDropTarget' },
          {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          }
        ),

      getIsSticky: () => true,

      onDragEnter({ self }) {
        const closestEdge = extractClosestEdge(self.data);

        dropTargState.value = { status: 'draggingAndHovering', closestEdge };
      },

      onDrag({ self }) {
        const closestEdge = extractClosestEdge(self.data);

        // atualizar apenas se alguma coisa mudou
        if (
          dropTargState.value.status !== 'draggingAndHovering' ||
          dropTargState.value.closestEdge !== closestEdge
        ) {
          dropTargState.value = { status: 'draggingAndHovering', closestEdge };
        }
      },

      onDragLeave: () => {
        dropTargState.value.status = 'idle';
      },

      onDrop: () => {
        dropTargState.value.status = 'idle';
      },
    })
  );
});

onUnmounted(() => {
  cleanup();
});

//

const active = computed(() =>
  useSelectedCells({ action: 'getAll', get: 'ids' })!.value.has(
    cellInfo.value.id
  )
);

const toggleActive = () => {
  const cell: ActiveCell = {
    id: cellInfo.value.id,
    cellIndex,
    shiftIndex,
    dayIndex,
    date: cellInfo.value.date.format('YYYY-MM-DD'),
    weekday: cellInfo.value.date.format('dddd'),
  };

  active.value
    ? useSelectedCells({ action: 'removeOne', cell })
    : useSelectedCells({ action: 'addOne', cell });
};

//

defineEmits(['atividade-change']);

const showBreaks = inject('showBreaks');

const popoverOpen = ref(false);
</script>

<template>
  <div
    ref="cell-wrap"
    v-show="showBreaks ? true : cellInfo.type !== 'intervalo'"
    :class="[
      'relative not-last:border-b-[0.119565rem] nth-of-type-[2n]:mb-[0.5px] border-t-solid border-t-transparent border-b-2 border-b-solid border-b-ldsa-text-default/65 transform-[translateZ(0)] last:border-b-transparent',
      active && 'bg-ldsa-green-2/15',
    ]"
    @click="cellInfo.type !== 'intervalo' && editMode && toggleActive()"
  >
    <SectionHorarioDapeEditDropIndicator
      v-if="
        dropTargState.status === 'draggingAndHovering' &&
        dropTargState.closestEdge &&
        dropTargState.closestEdge === 'top'
      "
      class="translate-z-0 -translate-y-[0.10195rem]"
      :edge="dropTargState.closestEdge"
      :maxCapacityReached="maxCapacityReached"
    />

    <div
      ref="cell"
      id="horario"
      class="relative box-border text-center h-[1.4375rem] 2xl:h-6 flex justify-center items-center text-[0.813rem] font-medium"
      :class="{
        'text-ldsa-text-green dark:brightness-115': active,
        'bg-ldsa-grey/20': cellInfo.type === 'intervalo' && !active,
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
        @click.stop
        :class="[
          'absolute right-1 pl-1',
          !popoverOpen && 'hover',
          active ? 'bg-[#ebf8ed] dark:bg-[#192728]' : 'bg-ldsa-bg ',
        ]"
      >
        <SectionHorarioDapeEditCellEditButtons
          v-if="editMode"
          v-model="cellInfo"
          v-model:popover="popoverOpen"
          @atividade-change="$emit('atividade-change')"
        />
      </span>
    </div>

    <SectionHorarioDapeEditDropIndicator
      v-if="
        dropTargState.status === 'draggingAndHovering' &&
        dropTargState.closestEdge &&
        dropTargState.closestEdge === 'bottom'
      "
      class="translate-z-0"
      :maxCapacityReached="maxCapacityReached"
      :edge="dropTargState.closestEdge"
    />
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
