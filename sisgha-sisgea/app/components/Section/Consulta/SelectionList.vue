<script setup lang="ts">
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';

const scheduleSelectionData = ref<OptionData[]>([
  {
    nome: 'Formação',
    content: [{ value: 'f1', label: 'formacao1' }],
    selected: null,
  },
  {
    nome: 'Curso',
    content: null,
    selected: null,
  },
  {
    nome: 'Turma',
    content: null,
    selected: null,
  },
]);

const allHaveSelected = computed(
  () =>
    scheduleSelectionData.value.find(data => data.selected === null) ===
    undefined
);

const queries: Ref<UseQueryReturnType<any, any>[]> = ref([]);

// formação

const formacaoQuery = useQuery({ ...listOfertasFormacao(), enabled: false });

await useQueryAndDefineData(formacaoQuery, scheduleSelectionData, 0, item => ({
  label: item.nome,
  value: item.id,
}));

queries.value.push(formacaoQuery);

// curso

const apiClient = useApiClient();

useQueryAndDefineDataWithWatcher(
  scheduleSelectionData,
  1,
  ['curso', 'cursos-list'],
  apiClient.cursos.cursoList(),
  item => ({ label: item.nome, value: item.id }),
  queries
);

useQueryAndDefineDataWithWatcher(
  scheduleSelectionData,
  2,
  ['turma', 'turmas-list'],
  apiClient.turmas.turmaList(),
  item => ({ label: item.periodo, value: item.id }),
  queries
);

//

const registerScheduleSelection = () => {
  // setScheduleSelection e n sei oq
};
</script>

<template>
  <SectionConsultaAccordion
    v-for="(_, index) in scheduleSelectionData"
    :open="scheduleSelectionData[index]!.nome === 'Formação'"
    v-model="scheduleSelectionData[index]!.selected"
    :title="scheduleSelectionData[index]!.nome"
    :items="scheduleSelectionData[index]!.content ?? []"
    :disabled="!scheduleSelectionData[index]!.content"
  />

  <NuxtLink
    @click="registerScheduleSelection"
    to="/sisgha/consulta/horario"
    class="w-full"
  >
    <UIButtonDefault :disabled="!allHaveSelected" class="w-full">
      Ver horário
    </UIButtonDefault>
  </NuxtLink>
</template>
