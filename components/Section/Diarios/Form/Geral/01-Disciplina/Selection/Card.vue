<script setup lang="ts">
import type { DisciplinaFindOneResultDto } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultDto;
};

const selectedDisciplina = defineModel<string | null>('selectedDisciplina');

const props = defineProps<Props>();
const disciplina = toRef(props, 'disciplina');
</script>

<template>
  <UICardSelectionDiscipline variant="block">
    <template #title>
      {{ disciplina.nome }}
    </template>

    <template #actions>
      <input type="radio" />
    </template>

    <UICardLine>
      <span class="text-left w-full block">
        Carga Horária: {{ disciplina.cargaHoraria }}

        <br />s{{ selectedDisciplina }} <br />d{{ disciplina.id }}
      </span>
    </UICardLine>
  </UICardSelectionDiscipline>
</template>
