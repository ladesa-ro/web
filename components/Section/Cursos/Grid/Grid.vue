<script lang="ts" setup>
import type { CursoFindOneResultDto } from '@ladesa-ro/api-client-fetch';

type Props = {
  searchBarText: string;
};

const props = defineProps<Props>();
const $emit = defineEmits(['edit']);

const { searchBarText } = toRefs(props);
const { cursos } = await useApiCursosFindAll(searchBarText);

const apiClient = useApiClient();

const getCourseCoverImageSrc = (item: CursoFindOneResultDto) => {
  const imagemCapa = item.imagemCapa;
  
  if (imagemCapa) {
    return `${apiClient.request.config.BASE}/cursos/${item.id}/imagem/capa?imgCapa=${imagemCapa.id}`;
  }

  return null;
};
</script>

<template>
  <UIGrid :items="cursos">
    <template #item="{ item: curso }">
      <UICard variant="block" :src="getCourseCoverImageSrc(curso)">
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
