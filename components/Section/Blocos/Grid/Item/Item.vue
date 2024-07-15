<script setup lang="ts">
import type { BlocoFindOneResultDto } from '@ladesa-ro/api-client-fetch';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: BlocoFindOneResultDto | null;
};

const props = defineProps<Props>();

//

const { item: bloco } = toRefs(props);

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !bloco">
    <UICard v-if="bloco" variant="block" :src="coverImageSrc">
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
  </UICardAutoSkeleton>
</template>
