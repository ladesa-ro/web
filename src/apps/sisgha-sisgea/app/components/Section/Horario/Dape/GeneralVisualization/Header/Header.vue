<script setup lang="ts">
import { IconsClass, IconsEducator, IconsOthers } from '#components';

const toggleItems = [
  {
    text: 'Professor',
    value: 'professor',
    icon: IconsEducator,
  },
  {
    text: 'Turma',
    value: 'turma',
    icon: IconsClass,
  },
  {
    text: 'Mesclado',
    value: 'mesclado',
    icon: IconsOthers,
  },
];

const selectedToggleItem = defineModel<'professor' | 'turma' | 'mesclado'>(
  'toggle',
  { required: true }
);

//

const popoverOpen = ref(false);
</script>

<template>
  <div
    class="flex max-md:flex-col justify-between max-md:gap-4 pb-6 border-b border-b-ldsa-grey"
  >
    <UIToggle v-model="selectedToggleItem" class="h-max" :items="toggleItems" />

    <SectionHorarioDapeGeneralVisualizationHeaderSelectWeek
      v-model="popoverOpen"
    />
  </div>
</template>
