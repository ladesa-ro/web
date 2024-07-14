<script setup lang="ts">
import type { DisciplinaFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';
import {
  useApiImageRoute,
  UseApiResourceImageResource,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  disciplina?: DisciplinaFindOneResultDto | null;
};

const props = defineProps<Props>();

const cardElRef = ref(null);
const { height: cardElBoundingHeight } = useElementBounding(cardElRef);

const skeletonHeight = ref(`18.15rem`);

watch([cardElBoundingHeight], ([height]) => {
  if (height) {
    skeletonHeight.value = `${height}px`;
  }
});

const coverImage = useApiImageRoute(
  UseApiResourceImageResource.DISCIPLINA_COVER,
  props.disciplina
);
</script>

<template>
  <UICardSkeleton :style="{ height: skeletonHeight }" v-if="isLoading" />

  <UICard
    v-if="!isLoading && disciplina"
    ref="cardElRef"
    variant="block"
    :src="coverImage"
  >
    <template #title>
      {{ disciplina.nome }}
    </template>

    <template #actions>
      <SectionDisciplinasModal :editId="disciplina.id" />
    </template>

    <UICardLine>
      <span>Carga Horária: {{ disciplina.cargaHoraria }} horas.</span>
    </UICardLine>
    <UICardLine>
      <span>Abreviação: {{ disciplina.nomeAbreviado }}</span>
    </UICardLine>
  </UICard>
</template>
