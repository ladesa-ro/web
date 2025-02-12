<script lang="ts" setup>
import type { BlocoFindOneResultView } from '@ladesa-ro/api-client-fetch';
import fodase from '~/components/Section/Blocos/Form/Form.vue';

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
      :src="coverImageSrc"
      :title="bloco.nome"
      variant="block"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="bloco.id"
          :form-component="fodase"
        />
      </template>

      <UICardLine :text="`${bloco.nome} - ${bloco.codigo}`" />
      <UICardLine :text="bloco.campus.apelido" />
    </UICard>
  </UICardAutoSkeleton>
</template>
