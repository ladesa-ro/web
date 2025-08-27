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
      getInitialData: () => ({ ...horarioMeta.value, type: 'cellDraggable' }),
      onDrag: () => {
        horario.value?.classList.add('dragging');
      },
      onDrop: () => {
        horario.value?.classList.remove('dragging');
      },
    }),
    dropTargetForElements({
      element: horario.value,
      getData: ({ input, element }) => {
        return attachClosestEdge(
          { ...horarioMeta.value, type: 'cellDropTarget' },
          {
            input,
            element,
            allowedEdges: ['top', 'bottom'],
          }
        );
      },
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

const showIntervals = useShowIntervals();

//

defineEmits(['atividade-change']);
</script>

<template>
  <div
    ref="horario-father"
    v-show="showIntervals ? true : horarioMeta.tipo !== 'intervalo'"
    :class="[
      'relative not-last:border-b-[0.119565rem] nth-of-type-[2n]:mb-[0.5px] border-t-solid border-t-[transparent] border-b-solid border-b-ldsa-grey transform-[translateZ(0)]',
      active && 'bg-ldsa-green-2/10',
    ]"
    @click="toggleActive()"
  >
    <SectionHorarioDapeEditDropIndicator
      v-if="
        dropTargState.status === 'draggingAndHovering' &&
        dropTargState.closestEdge &&
        dropTargState.closestEdge === 'top'
      "
      class="translate-z-0 -translate-y-[0.10195rem]"
      :edge="dropTargState.closestEdge"
    />

    <div
      ref="horario"
      id="horario"
      class="relative box-border text-center h-9 flex justify-center items-center font-medium"
      :class="{
        'text-ldsa-text-default': active,
        'bg-ldsa-grey/20': horarioMeta.tipo === 'intervalo' && !active,
      }"
    >
      {{ horarioMeta.tipo }} - {{ horarioMeta.id }}

      <span
        v-if="horarioMeta.tipo !== 'intervalo'"
        class="absolute right-3 cursor-pointer hover"
      >
        <SectionHorarioDapeEditCellEditButtons
          @atividade-change="$emit('atividade-change')"
          v-model="horarioMeta"
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
      :edge="dropTargState.closestEdge"
    />
  </div>
</template>

<style scoped>
.dragging {
  opacity: 0.15;
}
</style>
