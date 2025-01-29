<script setup lang="ts">
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultView;
};
const { disciplina } = defineProps<Props>();
</script>

<template>
  <UICardSelectionDiscipline :title="disciplina.nome" variant="block">
    <template #actions>
      <v-radio color="success" :value="disciplina.id" />
    </template>

    <UICardLine
      class="block w-full text-left"
      :text="`Carga horária: ${disciplina.cargaHoraria}`"
    />
  </UICardSelectionDiscipline>
</template>
