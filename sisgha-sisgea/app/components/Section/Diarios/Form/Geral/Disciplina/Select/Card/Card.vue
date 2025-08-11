<script lang="ts" setup>
import type { Ladesa_ManagementService_Domain_Contracts_DisciplinaFindOneOutput as DisciplinaFindOneOutput } from '@ladesa-ro/management-service-client';

type Props = {
  disciplina: DisciplinaFindOneOutput;
};
const { disciplina } = defineProps<Props>();

const selectedRadio = ref(null);
</script>

<template>
  <UICardSelectionDiscipline :title="disciplina.nome" variant="block">
    <template #actions>
      <UIRadio :items="[disciplina.nome]" v-model="selectedRadio" />
    </template>

    <UICardLine
      :text="`Carga horária: ${disciplina.cargaHoraria}`"
      class="block w-full text-left"
    />
  </UICardSelectionDiscipline>
</template>
