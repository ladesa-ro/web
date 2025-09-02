<script setup lang="ts">
import { autoScrollWindowForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Cell } from '~/composables/schedule/edit/useScheduleEditTypes';

const shiftSchedule = defineModel<Cell[]>({
  default: [],
  required: true,
});

const turnoId = crypto.randomUUID();

shiftSchedule.value = shiftSchedule.value.map(horario => ({
  ...horario,
  turnoId,
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
      getData: () => ({ id: turnoId, maxCapacity, type: 'shiftDropTarget' }),

      canDrop: ({ source }) => {
        if (source.data.turnoId == turnoId) {
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
    class="flex flex-col justify-start my-5 translate-z-0 will-change-transform max-w-50 mx-auto p-0"
  >
    <SectionHorarioDapeEditCell
      v-for="(horario, index) in shiftSchedule"
      :key="horario.id"
      :turno-id="turnoId"
      :closestEdge="closestEdgeToElement"
      :maxCapacityReached="maxCapacityReached"
      v-model="shiftSchedule[index]!"
      @atividade-change="$emit('atividade-change')"
    />
  </div>
</template>
