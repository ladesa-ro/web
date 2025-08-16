<script setup lang="ts">
import { type UseQueryDefinedReturnType } from '@tanstack/vue-query';

const scope = effectScope();

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

const queries: UseQueryDefinedReturnType<any, any>[] = [];

//

const formacaoSelected = ref();
scope.run(() => {
  watch(
    () => scheduleSelectionData.value[0]?.selected,
    async () => {
      formacaoSelected.value = await useQueryAndDefineData(
        scheduleSelectionData,
        0,
        listOfertasFormacao(),
        item => ({ label: item.nome, value: item.id }),
        queries
      );
    },
    { immediate: true }
  );
});
scope.stop();

const testeVal = ref();
const teste = (itemSelected: any) => (testeVal.value = itemSelected);

//

const registerScheduleSelection = () => {
  // setScheduleSelection e n sei oq
}
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

  <NuxtLink @click="registerScheduleSelection" to="/sisgha/consulta/horario" class="w-full">
    <UIButtonDefault :disabled="allHaveSelected" class="w-full">
      Ver horário
    </UIButtonDefault>
  </NuxtLink>
</template>
