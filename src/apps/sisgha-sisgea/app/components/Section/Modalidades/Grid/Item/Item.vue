<script lang="ts" setup>
import ModalidadesForm from '../../Form/Form.vue';
import type { ModalidadeFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: ModalidadeFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: modalidade } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'modalidades' : props.link;

const coverImageSrc = useApiImageRoute(ApiImageResource.MODALIDADE_COVER, modalidade);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !modalidade">
    <UICard
      v-if="modalidade"
      :src="coverImageSrc"
      :title="modalidade.nome"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="`${link}/${modalidade.id}`">
          <DialogModalEditOrCreateModal :edit-id="modalidade.id" :form-component="ModalidadesForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`Slug: ${modalidade.slug}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
