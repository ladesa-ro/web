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
  <div class="flex max-lg:flex-col gap-6 justify-between w-full">
    <div class="flex flex-col gap-5 w-full lg:max-w-3xs">
      <UIToggle :items="toggleItems" v-model="toggleValue" />

      <UISearchBar v-model="searchBarValue" />

      <!-- professor -->

      <span
        v-if="isLoadingProfs && toggleValue === 'professor'"
        class="text-center text-ldsa-grey"
        >Carregando...</span
      >
      <span
        v-if="isErrorProfs && toggleValue === 'professor'"
        class="text-center text-ldsa-grey"
      >
        Não foi possível carregar a listagem de professores.
      </span>

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'professor' && !isLoadingProfs && !isErrorProfs"
        v-model="selectedCheckboxes"
        :items="professoresParsedItems ?? []"
        :search-bar-value="searchBarValue"
      />

      <!-- turma -->

      <span
        v-if="isLoadingProfs && toggleValue === 'turma'"
        class="text-center text-ldsa-grey"
        >Carregando...</span
      >
      <span
        v-if="isErrorProfs && toggleValue === 'turma'"
        class="text-center text-ldsa-grey"
        >Não foi possível carregar a listagem de turmas.</span
      >

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'turma' && !isLoadingTurmas && !isErrorTurmas"
        v-model="selectedCheckboxes"
        :items="turmasParsedItems ?? []"
        :search-bar-value="searchBarValue"
      />
    </div>

    <div class="flex-1">
      <!-- TODO: adicionar grade de horário -->
    </div>
  </div>
</template>
