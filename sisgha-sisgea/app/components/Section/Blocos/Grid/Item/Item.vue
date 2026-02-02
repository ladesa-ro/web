<script lang="ts" setup>
import BlocosForm from '~/components/Section/Blocos/Form/Form.vue';
import type { BlocoFindOneOutputDto } from '~/helpers/api-client';

type Props = {
  isLoading?: boolean;
  item?: BlocoFindOneOutputDto | null;
};

const { item: bloco } = defineProps<Props>();

//

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !bloco">
    <UICard
      v-if="bloco"
      :src="coverImageSrc"
      :title="bloco.nome"
      variant="block"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="bloco.id"
          :form-component="BlocosForm"
        />
      </template>

      <UICardLine :text="`${bloco.nome} - ${bloco.codigo}`" />
      <UICardLine :text="bloco.campus.apelido" />
    </UICard>
  </UICardAutoSkeleton>
</template>
