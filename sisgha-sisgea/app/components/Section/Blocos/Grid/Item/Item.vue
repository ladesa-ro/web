<script setup lang="ts">
import type { BlocoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import fodase from '~/components/Section/Blocos/Form/Form.vue';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: BlocoFindOneResultView | null;
};

const { item: bloco } = defineProps<Props>();

//

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !bloco">
    <UICard
      v-if="bloco"
      variant="block"
      :title="bloco.nome"
      :src="coverImageSrc"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :form-component="fodase"
          :edit-id="bloco.id"
        />
      </template>

      <UICardLine :text="`${bloco.nome} - ${bloco.codigo}`" />
      <UICardLine :text="bloco.campus.apelido" />
    </UICard>
  </UICardAutoSkeleton>
</template>
