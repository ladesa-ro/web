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

const popoverOpen = ref(false);
</script>

<template>
  <div class="general-visualization-header u-flex u-justify-between u-pb-6">
    <UIToggle
      v-model="selectedToggleItem"
      class="general-visualization-header__toggle"
      :items="toggleItems"
    />

    <SectionHorarioDapeGeneralVisualizationHeaderSelectWeek
      v-model="popoverOpen"
    />
  </div>
</template>

<style scoped>
.general-visualization-header {
  border-bottom: 1px solid var(--ladesa-grey-color);
}

.general-visualization-header__toggle {
  height: max-content;
}

@media (max-width: 767.98px) {
  .general-visualization-header {
    flex-direction: column;
    gap: var(--ui-space-4);
  }
}
</style>
