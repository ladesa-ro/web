<script setup lang="ts">
import { IconsClass, IconsEducator } from '#components';

const toggleItems = [
  { text: 'Professor', value: 'professor', icon: IconsEducator },
  { text: 'Turma', value: 'turma', icon: IconsClass },
];

const toggleValue = ref<'professor' | 'turma'>('professor');

//

const searchBarValue = ref('');

//

const turmasEntity = useTurmas();
const usuariosEntity = useUsuarios();

const {
  data: turmas,
  isLoading: isLoadingTurmas,
  isError: isErrorTurmas,
} = turmasEntity.list();

const {
  data: professores,
  isLoading: isLoadingProfs,
  isError: isErrorProfs,
} = usuariosEntity.list();

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
  <div class="mesclado u-flex u-justify-between u-gap-6 u-w-full">
    <div class="mesclado__sidebar u-flex u-flex-col u-gap-5 u-w-full">
      <UIToggle v-model="toggleValue" :items="toggleItems" />

      <UISearchBar v-model="searchBarValue" />

      <!-- professor -->

      <span
        v-if="isLoadingProfs && toggleValue === 'professor'"
        class="mesclado__status-text u-text-center"
        >Carregando...</span
      >
      <span
        v-if="isErrorProfs && toggleValue === 'professor'"
        class="mesclado__status-text u-text-center"
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
        class="mesclado__status-text u-text-center"
        >Carregando...</span
      >
      <span
        v-if="isErrorProfs && toggleValue === 'turma'"
        class="mesclado__status-text u-text-center"
        >Não foi possível carregar a listagem de turmas.</span
      >

      <SectionHorarioDapeGeneralVisualizationMescladoList
        v-show="toggleValue === 'turma' && !isLoadingTurmas && !isErrorTurmas"
        v-model="selectedCheckboxes"
        :items="turmasParsedItems ?? []"
        :search-bar-value="searchBarValue"
      />
    </div>

    <div class="u-flex-1">
      <!-- TODO: adicionar grade de horário -->
    </div>
  </div>
</template>

<style scoped>
.mesclado__status-text {
  color: var(--ladesa-grey-color);
}

@media (max-width: 1023.98px) {
  .mesclado {
    flex-direction: column;
  }
}

@media (min-width: 1024px) {
  .mesclado__sidebar {
    max-width: 16rem;
  }
}
</style>
