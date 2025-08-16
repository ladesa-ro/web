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
    scheduleSelectionData.value.find(data => data.content === null) ===
    undefined
);

const queries: UseQueryReturnType<any, any>[] = [];

// formação

const formacaoQuery = useQuery({ ...listOfertasFormacao(), enabled: false });

const formacaoSelected = await useQueryAndDefineData(
  formacaoQuery,
  scheduleSelectionData,
  0,
  item => ({ label: item.nome, value: item.id })
);

queries.push(formacaoQuery);

// curso

const cursoQuery = useQuery({ ...listCursos(), enabled: false });
const cursoSelected = ref();

watch(
  () => scheduleSelectionData.value[0]?.selected,
  async newVal => {
    console.log('new val!!!!! uuuuuhuuu');

    if (newVal !== null) {
      cursoSelected.value = await useQueryAndDefineData(
        cursoQuery,
        scheduleSelectionData,
        1,
        item => ({ label: item.nome, value: item.id })
      );

      queries.push(cursoQuery);
    }
  }
);

// turma

const turmaQuery = useQuery({ ...listTurmas(), enabled: false });
const turmaSelected = ref();

watch(
  () => scheduleSelectionData.value[1]?.selected,
  async newVal => {
    if (newVal !== null) {
      turmaSelected.value = await useQueryAndDefineData(
        turmaQuery,
        scheduleSelectionData,
        2,
        item => ({ label: item.periodo, value: item.id })
      );

      queries.push(turmaQuery);
    }
  }
);

//

const testeVal = ref();
const teste = (itemSelected: any) => (testeVal.value = itemSelected);

//

const registerScheduleSelection = () => {
  // setScheduleSelection e n sei oq
};
</script>

<template>
  <!-- queries[index].isError || queries[index].isLoading -->

  testedaminhafilha: {{ formacaoSelected }}

  <SectionConsultaAccordion
    @option-selected="item => teste(item)"
    v-for="(_, index) in scheduleSelectionData"
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
    <UIButtonDefault :disabled="allHaveSelected" class="w-full">
      Ver horário
    </UIButtonDefault>
  </NuxtLink>
</template>
