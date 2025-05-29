<script setup lang="ts">
import IconClass from '~/components/Icons/IconClass.vue';
import IconEducator from '~/components/Icons/IconEducator.vue';

const toggleItems = [
  { text: 'Professor', value: 'professor', icon: IconEducator },
  { text: 'Turma', value: 'turma', icon: IconClass },
];

const toggleValue = ref<'professor' | 'turma'>('professor');

//

const searchBarValue = ref('');

//

// TODO: vincular à API
const checkboxItemsProfessor = [
  'prof 1',
  'prof 2',
  'prof 3',
  'prof 4',
  'prof 5',
];

const checkboxItemsTurma = [
  'turma 1',
  'turma 2',
  'turma 3',
  'turma 4',
  'turma 5',
];

const selectedCheckboxes = ref([]);
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="flex flex-col gap-5">
      <UIToggle :items="toggleItems" v-model="toggleValue" />

      <UISearchBar v-model="searchBarValue" />

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'professor'"
        :items="checkboxItemsProfessor"
        v-model="selectedCheckboxes"
        :search-bar-value="searchBarValue"
      />

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'turma'"
        :items="checkboxItemsTurma"
        v-model="selectedCheckboxes"
        :search-bar-value="searchBarValue"
      />
    </div>

    <div class="flex-1">
      <!-- TODO: adicionar grade de horário -->
    </div>
  </div>
</template>
