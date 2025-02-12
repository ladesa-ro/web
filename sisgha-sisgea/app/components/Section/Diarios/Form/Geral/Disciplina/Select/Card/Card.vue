<script lang="ts" setup>
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultView;
};
const { disciplina } = defineProps<Props>();
</script>

<template>
  <UICardSelectionDiscipline :title="disciplina.nome" variant="block">
    <template #actions>
      <v-radio :value="disciplina.id" color="success" />
    </template>

    <UICardLine
      :text="`Carga horária: ${disciplina.cargaHoraria}`"
      class="block w-full text-left"
    />
  </UICardSelectionDiscipline>
</template>
