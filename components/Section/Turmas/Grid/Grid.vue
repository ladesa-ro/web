<script setup lang="ts">
const props = defineProps<{ searchBarText: string }>();

const { searchBarText } = toRefs(props);

const { turmas } = await useApiTurmasFindAll(searchBarText);
</script>

<template>
  <UIGrid :items="turmas">
    <template #item="{ item: turma }">
      <UICard
        variant="block"
        :src="`https://luna.sisgha.com/api/turmas/${turma.id}/imagem/capa?imgCapa=${turma.imagemCapa?.id}`"
      >
        <template #title>
          {{ turma.periodo }} - {{ turma.curso.modalidade.nome }}
        </template>

        <template #actions>
          <SectionTurmasModal :editId="turma.id" />
        </template>

        <UICardLine>
          <span>Curso: {{ turma.curso.nomeAbreviado }}</span>
        </UICardLine>
        <UICardLine>
          <span>Turno: Matutino e Vespertino</span>
        </UICardLine>
      </UICard>
    </template>
  </UIGrid>
</template>
