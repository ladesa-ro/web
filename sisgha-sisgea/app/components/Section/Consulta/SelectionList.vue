<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

type Option = {
  nome: string;
  content: any | null;
  selected: any | null;
};

const selectedData: Ref<Option[]> = ref([
  {
    nome: 'Formação',
    content: [{ value: 'f1', label: 'formacao1' }],
    selected: null,
  },
  {
    nome: 'Curso',
    content: [{ value: 'c1', label: 'curso1' }],
    selected: null,
  },
  {
    nome: 'Turma',
    content: [{ value: 't1', label: 'turma1' }],
    selected: null,
  },
]);

const formacoes = useQuery(listOfertasFormacao());

const formacoesData = await formacoes.promise.value;

selectedData.value[0]!.content = formacoesData.data;

// const waitFormacaoBeSelected = new Promise(resolve => {
//   watch(
//     () => selectedData.value[0]!.selected,
//     (newVal, oldVal) => {
//       if (newVal !== null && newVal !== oldVal)
//         resolve(selectedData.value[0]!.selected);
//     },
//     { immediate: true }
//   );
// });

// await waitFormacaoBeSelected;

const testeVal = ref();
const teste = (itemSelected: any) => testeVal.value = itemSelected;
</script>

<template>
  <!-- {{ formacoes.isLoading }}
  <br>
<br>
<pre>
  {{ selectedData }} -->
<!-- </pre> -->
  teste: {{ testeVal }}
  o valor acima deveria aparecer na teoria quando se seleciona um item

  <SectionConsultaAccordion
  @option-selected="(item) => teste(item)"
    v-for="(_, index) in selectedData"
    :title="selectedData[index]!.nome"
    :items="selectedData[index]!.content"
    v-model="selectedData[index]!.selected"
  />
</template>
