<script setup lang="ts">
import IconClass from '~/components/Icons/Class.vue';
import IconEducator from '~/components/Icons/Educator.vue';
import IconOthers from '~/components/Icons/Others.vue';

const toggleItems = [
  {
    text: 'Professor',
    value: 'professor',
    icon: IconEducator,
  },
  {
    text: 'Turma',
    value: 'turma',
    icon: IconClass,
  },
  {
    text: 'Mesclado',
    value: 'mesclado',
    icon: IconOthers,
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
      <UIToggle
        class="h-max"
        v-model="selectedToggleItem"
        :items="toggleItems"
      />

      <SectionHorarioDapeGeneralVisualizationHeaderSelectWeek
        v-model="popoverOpen"
      />
    </div>
</template>
