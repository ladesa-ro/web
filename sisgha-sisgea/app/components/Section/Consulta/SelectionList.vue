<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const scheduleSelectionData: Ref<OptionData[]> = ref(
  getScheduleSelectionData()
);

const allHaveSelected = computed(
  () =>
    scheduleSelectionData.value.find(data => data.selected === null) ===
    undefined
);

//

const queries: Ref<Queries> = ref({ formacao: null, curso: null, turma: null });

//

// formação

const formacaoQuery = useQuery({ ...listOfertasFormacao(), enabled: false });

await useQueryAndDefineData(
  formacaoQuery,
  scheduleSelectionData,
  0,
  item => ({ label: item.nome, value: item.id }),
  queries
);

// curso

const apiClient = useApiClient();

useQueryAndDefineDataThatDependOnOthers(
  scheduleSelectionData,
  1,
  ['curso', 'cursos-list'],
  apiClient.cursos.cursoList(),
  item => ({ label: item.nome, value: item.id }),
  queries
);

// turma

useQueryAndDefineDataThatDependOnOthers(
  scheduleSelectionData,
  2,
  ['turma', 'turmas-list'],
  apiClient.turmas.turmaList(),
  item => ({ label: item.periodo, value: item.id }),
  queries
);

//

const accordionMustBeOpen = ref<boolean[]>([true, false, false]);

let count = 0;
watch(
  scheduleSelectionData,
  () => {
    // the idea was "count <= 3", but, for some reason, the count is increasing by 2 on the first tick. the intention of this counter is to limit the automatic opening of accordions
    if (count <= 5) {
      accordionMustBeOpen.value = scheduleSelectionData.value.map(
        item => item.nome === 'Formação' || item.content !== null
      );
      count++;
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <SectionConsultaAccordion
    v-for="(item, index) in scheduleSelectionData"
    v-model:selected-option="scheduleSelectionData[index]!.selected"
    v-model:open="accordionMustBeOpen[index]!"
    :title="item.nome"
    :items="item.content ?? []"
    :disabled="!item.content"
    :error="Object.values(queries)[index]?.isError.value ?? false"
    :loading="Object.values(queries)[index]?.isLoading.value ?? false"
  />

  <!-- if all items are selected, send to the schedule of the selected turma  -->
  <NuxtLink
    @click="setScheduleSelectionData(scheduleSelectionData)"
    :to="`/sisgha/consulta/horario/${scheduleSelectionData[2]?.selected}`"
    class="w-full"
  >
    <UIButtonDefault :disabled="!allHaveSelected" class="w-full">
      Ver horário
    </UIButtonDefault>
  </NuxtLink>
</template>
