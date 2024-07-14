<script setup lang="ts">
import type { AmbienteFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';
import {
  useApiImageRoute,
  UseApiResourceImageResource,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  ambiente?: AmbienteFindOneResultDto | null;
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
  UseApiResourceImageResource.AMBIENTE_COVER,
  props.ambiente
);
</script>

<template>
  <UICardSkeleton :style="{ height: skeletonHeight }" v-if="isLoading" />

  <UICard
    v-if="!isLoading && ambiente"
    ref="cardElRef"
    variant="block"
    :src="coverImage"
  >
    <template #title>
      {{ ambiente.nome }}
    </template>

    <template #actions>
      <SectionAmbientesModal :editId="ambiente.id" />
    </template>

    <UICardLine>
      {{ ambiente.bloco.nome }}
    </UICardLine>

    <UICardLine> Capacidade: {{ ambiente.capacidade }} pessoas </UICardLine>
  </UICard>
</template>
