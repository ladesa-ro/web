<script setup lang="ts">
import { type CursoFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { useElementBounding } from '@vueuse/core';
import { ref, watch } from 'vue';
import {
  useApiImageRoute,
  UseApiResourceImageResource,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  curso?: CursoFindOneResultDto | null;
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
  UseApiResourceImageResource.CURSO_COVER,
  props.curso
);
</script>

<template>
  <UICardSkeleton :style="{ height: skeletonHeight }" v-if="isLoading" />

  <UICard
    v-if="!isLoading && curso"
    ref="cardElRef"
    variant="block"
    :src="coverImage"
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
