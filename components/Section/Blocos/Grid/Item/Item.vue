<script setup lang="ts">
import type { BlocoFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import { useElementBounding } from '@vueuse/core';
import { ref } from 'vue';
import {
  useApiImageRoute,
  UseApiResourceImageResource,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  bloco?: BlocoFindOneResultDto | null;
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
  UseApiResourceImageResource.BLOCO_COVER,
  props.bloco
);
</script>

<template>
  <UICardSkeleton :style="{ height: skeletonHeight }" v-if="isLoading" />

  <UICard
    v-if="!isLoading && bloco"
    ref="cardElRef"
    variant="block"
    :src="coverImage"
  >
    <template #title>
      {{ bloco.nome }}
    </template>

    <template #actions>
      <SectionBlocosModal :editId="bloco.id" />
    </template>

    <UICardLine>
      <span>{{ bloco.nome }} - {{ bloco.codigo }}</span>
    </UICardLine>

    <UICardLine>
      <span>{{ bloco.campus.apelido }} </span>
    </UICardLine>
  </UICard>
</template>
