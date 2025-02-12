<script lang="ts" setup>
import type { AmbienteFindOneResultView } from '@ladesa-ro/api-client-fetch';
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';

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
