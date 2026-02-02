<script lang="ts" setup>
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';
import type { AmbienteFindOneOutputDto } from '~/helpers/api-client';

type Props = {
  isLoading?: boolean;
  item?: AmbienteFindOneOutputDto | null;
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
