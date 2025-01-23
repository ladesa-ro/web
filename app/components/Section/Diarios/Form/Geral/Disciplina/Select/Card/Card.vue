<script setup lang="ts">
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultView;
};
const { disciplina } = defineProps<Props>();
</script>

<template>
  <UICardSelectionDiscipline variant="block">
    <template #title>
      {{ disciplina.nome }}
    </template>

    <template #actions>
      <v-radio color="success" :value="disciplina.id" />
    </template>

    <UICardLine>
      <span class="block w-full text-left">
        Carga Horária: {{ disciplina.cargaHoraria }}
      </span>
    </UICardLine>
  </UICardSelectionDiscipline>
</template>
