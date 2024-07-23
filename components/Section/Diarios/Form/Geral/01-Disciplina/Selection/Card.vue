<script setup lang="ts">
import type { DisciplinaFindOneResultDto } from '@ladesa-ro/api-client-fetch';

type Props = {
  disciplina: DisciplinaFindOneResultDto;
  selectedDisciplina: string | null;
  onDisciplinaSelect: (disciplinaId: string | null) => void;
};

const props = defineProps<Props>();
const disciplina = toRef(props, 'disciplina');
const selectedDisciplina = toRef(props, 'selectedDisciplina');
const onDisciplinaSelect = toRef(props, 'onDisciplinaSelect');

const isDisciplinaSelected = computed({
  get() {
    return selectedDisciplina.value === disciplina.value.id;
  },
  set(value) {
    if (value) {
      onDisciplinaSelect.value(disciplina.value.id);
    } else {
      onDisciplinaSelect.value(null);
    }
  },
});
</script>

<template>
  <UICardSelectionDiscipline variant="block">
    <template #title>
      {{ disciplina.nome }}
    </template>

    <template #actions>
      <v-radio
        class="detail"
        v-model="isDisciplinaSelected"
        :true-value="true"
        :false-value="false"
      />
    </template>

    <UICardLine>
      <span class="text-left w-full block">
        Carga Horária: {{ disciplina.cargaHoraria }}
      </span>
    </UICardLine>
  </UICardSelectionDiscipline>
</template>
