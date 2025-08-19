<script setup lang="ts">
import { autoScrollWindowForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { type HorarioPrag } from './ItemsList';

let cleanup = () => {};

type Column = { id: number };
const { id } = defineProps<Column>();

const horarios = defineModel<HorarioPrag[]>({ default: [], required: true });

const closestEdgeToElement: Ref<Edge | null> = ref(null);

const elementList = useTemplateRef('elementList');

onMounted(() => {
  if (!elementList.value) {
    console.warn('elementList.value = ' + elementList.value);
    return;
  }

  cleanup = combine(
    dropTargetForElements({
      element: elementList.value,
      getData: () => ({ id }),
    }),
    autoScrollWindowForElements()
  );
});

onUnmounted(() => {
  cleanup();
});

//

defineEmits(['atividade-change']);
</script>

<template>
  <div
    class="flex flex-col justify-start translate-z-0 will-change-transform p-0 w-60"
    ref="elementList"
  >
    <SectionHorarioDapeEditCell
      v-for="(horario, index) in horarios"
      :key="horario.id"
      v-model="horarios[index]!"
      :closestEdge="closestEdgeToElement"
      @atividade-change="$emit('atividade-change')"
    />
  </div>
</template>
