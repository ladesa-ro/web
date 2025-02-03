<script setup lang="ts">
import type { AmbienteFindOneResultView } from '@ladesa-ro/api-client-fetch';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: AmbienteFindOneResultView | null;
};

const props = defineProps<Props>();

//

const { item: ambiente } = toRefs(props);

const coverImageSrc = useApiImageRoute(
  ApiImageResource.AMBIENTE_COVER,
  ambiente
);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !ambiente">
    <UICard v-if="ambiente" variant="block" :src="coverImageSrc">
      <template #title>
        {{ ambiente.nome }}
      </template>

      <template #actions>
        <LazySectionAmbientesModal :edit-id="ambiente.id" />
      </template>

      <UICardLine>
        {{ ambiente.bloco.nome }}
      </UICardLine>

      <UICardLine> Capacidade: {{ ambiente.capacidade }} pessoas </UICardLine>
    </UICard>
  </UICardAutoSkeleton>
</template>
