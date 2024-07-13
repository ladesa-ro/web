<script setup lang="ts">
import type { TurmaFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';
import {
  useApiImageRoute,
  UseApiResourceImageResource,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  turma?: TurmaFindOneResultDto | null;
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
  UseApiResourceImageResource.TURMA_COVER,
  props.turma
);
</script>

<template>
  <UICardSkeleton :style="{ height: skeletonHeight }" v-if="isLoading" />

  <UICard
    v-if="!isLoading && turma"
    ref="cardElRef"
    variant="block"
    :src="coverImage"
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
