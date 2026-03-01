<script lang="ts" setup>
import OfertasFormacaoForm from '../../Form/Form.vue';

import type { OfertaFormacaoFindOneOutputDto } from '~/helpers/api-client';

type Props = {
  isLoading?: boolean;
  item?: OfertaFormacaoFindOneOutputDto | null;
};

const props = defineProps<Props>();

const { item: ofertaFormacao } = toRefs(props);

//

// const coverImageSrc = useApiImageRoute(ApiImageResource., ofertaFormacao);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !ofertaFormacao">
    <UICard
      v-if="ofertaFormacao"
      :src="null"
      :title="ofertaFormacao.nome"
      variant="block"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="ofertaFormacao.id"
          :form-component="OfertasFormacaoForm"
        />
      </template>

      <UICardLine :text="`Abreviação: ${ofertaFormacao.slug}`" />
      <UICardLine :text="`Modalidade: ${ofertaFormacao.modalidade.nome}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
