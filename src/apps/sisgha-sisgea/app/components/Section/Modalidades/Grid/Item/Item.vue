<script lang="ts" setup>
import ModalidadesForm from '../../Form/Form.vue';
import type { ModalidadeFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: ModalidadeFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: modalidade } = props;

const link = props.link === undefined || props.link === '' ? 'modalidades' : props.link;
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !modalidade">
    <UICard
      v-if="modalidade"
      :src="null"
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
