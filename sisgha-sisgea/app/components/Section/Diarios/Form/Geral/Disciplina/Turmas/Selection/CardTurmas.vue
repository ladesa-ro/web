<script lang="ts" setup>
import type { TurmaFindOneResultView } from '@ladesa-ro/api-client-fetch';

type Props = {
  turma: TurmaFindOneResultView;
  selectedTurma: string | null;
  onTurmaSelect: (turmaId: string | null) => void;
};

const props = defineProps<Props>();
const turma = toRef(props, 'turma');
const selectedTurma = toRef(props, 'selectedTurma');
const onTurmaSelect = toRef(props, 'onTurmaSelect');
</script>

<template>
  <UICardSelectionDiscipline variant="block">
    <template #title>
      <span class="title"
        >{{ turma.periodo }} - {{ turma.curso.ofertaFormacao.nome }}</span
      >
    </template>

    <template #actions>
      <v-checkbox class="detail" color="success" value="success" />
    </template>

    <UICardLine class="card-line">
      <span>Turno: Matutino e Vespertino</span>
    </UICardLine>
  </UICardSelectionDiscipline>
</template>

<style scoped>
.title {
  max-width: 80%; /* Ajuste conforme necessário */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-line {
  margin-left: 1rem; /* Ajuste conforme necessário */
  padding-left: 0; /* Ajuste conforme necessário */
  text-align: left;
}
</style>
