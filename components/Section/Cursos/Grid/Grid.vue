<script setup>
const props = defineProps({
  searchBarText: String,
});

const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);

const { cursos } = await useApiCursosFindAll(searchBarText);
</script>

<template>
  <UIGrid :items="cursos">
    <template #item="{ item: curso }">
      <UICard
        variant="block"
        :src="`https://luna.sisgha.com/api/cursos/${curso.id}/imagem/capa?imgCapa=${curso.imagemCapa?.id}`"
      >
        <template #title>
          {{ curso.nome }}
        </template>

        <template #actions>
          <SectionCursosModal :editId="curso.id" />
        </template>

        <UICardLine>
          <span>Abreviação: {{ curso.nomeAbreviado }}</span>
        </UICardLine>
        <UICardLine>
          <span>Modalidade: {{ curso.modalidade.nome }}</span>
        </UICardLine>
      </UICard>
    </template>
  </UIGrid>
</template>
