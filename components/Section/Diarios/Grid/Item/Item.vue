<script setup>
import { defineProps, toRefs } from 'vue';

// Definição das props ajustadas
const props = defineProps({
  diario: Object,
});

const { diario } = toRefs(props);

// Realizei a chamada da ROTA useApiDiariosProfessorFindAllByDiarioId
const { diarioProfessorList } = await useApiDiariosProfessorFindAllByDiarioId({
  diario: diario.value,
});
</script>

<template>
  <UICard
    variant="block"
    :src="`https://luna.sisgha.com/api/disciplinas/${diario.id}/imagem/capa?imgCapa=${diario.imagemCapa?.id}`"
  >
    <template #title>
      {{ diario.disciplina.nome }}
    </template>

    <template #actions>
      <LazySectionDiariosModal :editId="diario.id" />
    </template>

    <UICardLine>
      <span>
        Professores:
        <template
          v-for="diarioProfessor in diarioProfessorList"
          :key="diarioProfessor.id"
        >
          {{ diarioProfessor.vinculo.usuario.nome }}
        </template>
      </span>
    </UICardLine>

    <UICardLine>
      <span>
        Turmas:
        {{ diario.turma.periodo }} - {{ diario.turma.curso.modalidade.nome }}
      </span>
    </UICardLine>
  </UICard>
</template>
