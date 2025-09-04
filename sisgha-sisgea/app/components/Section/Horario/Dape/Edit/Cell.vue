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
import { useShowIntervals } from '~/composables/schedule/edit/useScheduleIntervals';
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';

const {
  turnoId,
  dayId,
  maxCapacityReached = false,
} = defineProps<{
  dayId: number;
  turnoId: number;
  maxCapacityReached?: boolean;
}>();

const horarioMeta = defineModel<Cell>({
  default: {},
  required: true,
});

const horario = useTemplateRef('horario');
const horarioFather = useTemplateRef('horario-father');

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
  if (!horario.value || !horarioFather.value) {
    return;
  }

  cleanup = combine(
    draggable({
      element: horario.value,

      canDrag: () => horarioMeta.value.tipo !== 'intervalo',

      getInitialData: () => ({
        ...horarioMeta.value,
        dayId,
        turnoId,
        type: 'cellDraggable',
      }),

      onDrag: () => {
        horario.value?.classList.add('dragging');
      },

      onDrop: () => {
        horario.value?.classList.remove('dragging');
      },
    }),

    dropTargetForElements({
      element: horario.value,

      getData: ({ input, element }) =>
        attachClosestEdge(
          { ...horarioMeta.value, type: 'cellDropTarget' },
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

const active = ref(false);

const toggleActive = () => {
  active.value = !active.value;
  active.value
    ? useSelectedCells({ action: 'addOne', id: horarioMeta.value.id })
    : useSelectedCells({ action: 'removeOne', id: horarioMeta.value.id });
};

//

defineEmits(['atividade-change']);

const showIntervals = useShowIntervals();

const popoverOpen = ref(false);
</script>

<template>
  <div
    ref="horario-father"
    v-show="showIntervals ? true : horarioMeta.tipo !== 'intervalo'"
    :class="[
      'relative not-last:border-b-[0.119565rem] nth-of-type-[2n]:mb-[0.5px] border-t-solid border-t-[transparent] border-b-2 border-b-solid border-b-ldsa-text-default/65 transform-[translateZ(0)]',
      active && 'bg-ldsa-green-2/10',
    ]"
    @click="horarioMeta.tipo !== 'intervalo' && toggleActive()"
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
      ref="horario"
      id="horario"
      class="relative box-border text-center h-6 flex justify-center items-center text-[0.813rem] font-medium"
      :class="{
        'text-ldsa-text-green dark:brightness-115': active,
        'bg-ldsa-grey/20': horarioMeta.tipo === 'intervalo' && !active,
      }"
    >
      <span v-if="horarioMeta.tipo === 'aula'" class="truncate max-w-9/10">
        {{ horarioMeta.diario?.disciplina }} - {{ horarioMeta.diario?.turma }}
      </span>

      <span v-else-if="horarioMeta.tipo === 'vago'"> - </span>

      <span
        v-else-if="horarioMeta.tipo === 'intervalo'"
        class="text-ldsa-text-default/50"
      >
        Intervalo
      </span>

      <span
        v-if="horarioMeta.tipo !== 'intervalo'"
        @click.stop
        :class="[
          'absolute right-1 pl-1',
          !popoverOpen && 'hover',
          active ? 'bg-[#ebf8ed] dark:bg-[#192728]' : 'bg-ldsa-bg ',
        ]"
      >
        <SectionHorarioDapeEditCellEditButtons
          v-model="horarioMeta"
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
