<script setup lang="ts">
import type { AmbienteFindOneResultView } from '@ladesa-ro/api-client-fetch';
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';
import {
  ApiImageResource,
  useApiImageRoute,
} from '../../../../../integrations/api/RoutesUtil';

type Props = {
  isLoading?: boolean;
  item?: AmbienteFindOneResultView | null;
};

const { item: ambiente } = defineProps<Props>();

//

const coverImageSrc = useApiImageRoute(
  ApiImageResource.AMBIENTE_COVER,
  ambiente
);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !ambiente">
    <UICard
      v-if="ambiente"
      variant="block"
      :title="ambiente.nome"
      :src="coverImageSrc"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :form-component="AmbientesForm"
          :edit-id="ambiente.id"
        />
      </template>

      <UICardLine :text="ambiente.bloco.nome" />
      <UICardLine :text="`Capacidade: ${ambiente.capacidade} pessoas`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
