<script lang="ts" setup>
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultView;
};
const { disciplina } = defineProps<Props>();

const selectedRadio = ref(null);
</script>

<template>
  <UICardSelectionDiscipline :title="disciplina.nome" variant="block">
    <template #actions>
      <UIRadio :items="[disciplina.nome]" v-model="selectedRadio"/>
    </template>

    <UICardLine
      :text="`Carga horária: ${disciplina.cargaHoraria}`"
      class="block w-full text-left"
    />
  </UICardSelectionDiscipline>
</template>
