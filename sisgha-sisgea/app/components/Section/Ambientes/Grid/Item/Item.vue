<script lang="ts" setup>
import type { Ladesa_ManagementService_Domain_Contracts_AmbienteFindOneOutput as AmbienteFindOneOutput } from '@ladesa-ro/management-service-client';
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: AmbienteFindOneOutput | null;
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
      :src="coverImageSrc"
      :title="ambiente.nome"
      variant="block"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="ambiente.id"
          :form-component="AmbientesForm"
        />
      </template>

      <UICardLine :text="ambiente.bloco.nome" />
      <UICardLine :text="`Capacidade: ${ambiente.capacidade} pessoas`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
