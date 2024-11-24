<script setup lang="ts">
import type { DisciplinaFindOneResultView } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultView;
};

const props = defineProps<Props>();
const disciplina = toRef(props, 'disciplina');
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
      <span class="text-left w-full block">
        Carga Horária: {{ disciplina.cargaHoraria }}
      </span>
    </UICardLine>
  </UICardSelectionDiscipline>
</template>
