<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import IconClass from '~/components/Icons/Class.vue';
import IconEducator from '~/components/Icons/Educator.vue';

const toggleItems = [
  { text: 'Professor', value: 'professor', icon: IconEducator },
  { text: 'Turma', value: 'turma', icon: IconClass },
];

const toggleValue = ref<'professor' | 'turma'>('professor');

//

const searchBarValue = ref('');

//

const {
  data: turmas,
  isLoading: isLoadingTurmas,
  isError: isErrorTurmas,
} = useQuery(listTurmas());

const {
  data: professores,
  isLoading: isLoadingProfs,
  isError: isErrorProfs,
} = useQuery(listUsers());

const turmasParsedItems = computed(() => {
  if (turmas.value) {
    return turmas.value?.data.map(turma => {
      return {
        label: turma.periodo + ' - ' + turma.curso.nomeAbreviado,
        value: turma.id,
      };
    });
  }
});

const professoresParsedItems = computed(() => {
  if (professores.value) {
    return professores.value?.data.map(professor => {
      return { label: professor.nome ?? '', value: professor.id };
    });
  }
});

//

const selectedCheckboxes = ref([]);
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="flex flex-col gap-5 max-w-3xs">
      <UIToggle :items="toggleItems" v-model="toggleValue" />

      <UISearchBar v-model="searchBarValue" />

      <!-- TODO: add carregamento para quando isLoading = true e mensagem de erro para isError -->

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'professor'"
        :items="professoresParsedItems ?? []"
        v-model="selectedCheckboxes"
        :search-bar-value="searchBarValue"
      />

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'turma'"
        :items="turmasParsedItems ?? []"
        v-model="selectedCheckboxes"
        :search-bar-value="searchBarValue"
      />
    </div>

    <div class="flex-1">
      <!-- TODO: adicionar grade de horário -->
    </div>
  </div>
</template>
