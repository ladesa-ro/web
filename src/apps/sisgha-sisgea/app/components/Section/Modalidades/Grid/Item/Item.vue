<script lang="ts" setup>
import ModalidadesForm from '../../Form/Form.vue';
import type { ModalidadeFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: ModalidadeFindOneOutputDto | null;
};

const { item: modalidade } = defineProps<Props>();
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
        <DialogModalEditOrCreateModal
          :edit-id="modalidade.id"
          :form-component="ModalidadesForm"
        />
      </template>

      <UICardLine :text="`Slug: ${modalidade.slug}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
