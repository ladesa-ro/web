<script setup lang="ts">
import type { TurmaFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';

type Props = {
  isLoading?: boolean;
  turma?: TurmaFindOneResultDto | null;
};

defineProps<Props>();

const cardElRef = ref(null);
const { height: cardElBoundingHeight } = useElementBounding(cardElRef);

const skeletonHeight = ref(`18.15rem`);

watch([cardElBoundingHeight], ([height]) => {
  if (height) {
    skeletonHeight.value = `${height}px`;
  }
});
</script>

<template>
  <UICardSkeleton :style="{ height: skeletonHeight }" v-if="isLoading" />

  <UICard
    ref="cardElRef"
    v-if="!isLoading && turma"
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
