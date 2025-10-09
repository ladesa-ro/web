<script setup lang="ts">
import { autoScrollWindowForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';

const { shiftIndex, dayIndex, editMode } = defineProps<{
  shiftIndex: number;
  dayIndex: number;
  editMode?: boolean;
}>();

const shiftSchedule = defineModel<Cell[]>({
  default: [],
  required: true,
});

shiftSchedule.value = shiftSchedule.value.map(horario => ({
  ...horario,
  shiftIndex,
  dayIndex,
}));

//

const maxCapacity = shiftSchedule.value.length;

const shift = useTemplateRef('shift');

const maxCapacityReached = ref(true);

let cleanup = () => {};

onMounted(() => {
  if (!shift.value) {
    console.warn('elementList.value = ' + shift.value);
    return;
  }

  cleanup = combine(
    dropTargetForElements({
      element: shift.value,
      getData: () => ({
        id: shiftIndex,
        dayIndex,
        maxCapacity,
        dndType: 'shiftDropTarget',
      }),

      canDrop: ({ source }) => {
        if (source.data.dndType !== 'cellDraggable' || !editMode) {
          return false;
        }

        if (source.data.shiftIndex == shiftIndex) {
          maxCapacityReached.value = true;
          return true;
        }

        maxCapacityReached.value =
          shiftSchedule.value.length + 1 <= maxCapacity;

        return maxCapacityReached.value;
      },
    }),
    autoScrollWindowForElements()
  );
});

const closestEdgeToElement: Ref<Edge | null> = ref(null);

defineEmits(['atividade-change']);
</script>

<template>
  <div
    ref="shift"
    class="flex flex-col justify-start translate-z-0 will-change-transform w-44 p-0 min-h-[1.4375rem]"
  >
    <SectionHorarioDapeEditGridCell
      v-for="(horario, index) in shiftSchedule"
      :key="horario.id"
      :cellIndex="index"
      :dayIndex
      :shiftIndex
      :editMode
      :closestEdge="closestEdgeToElement"
      :maxCapacityReached="maxCapacityReached"
      v-model="shiftSchedule[index]!"
      @atividade-change="$emit('atividade-change')"
    />
  </div>
</template>
