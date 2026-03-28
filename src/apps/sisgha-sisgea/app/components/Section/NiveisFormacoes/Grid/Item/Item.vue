<script lang="ts" setup>
import NiveisFormacoesForm from '../../Form/Form.vue';
import type { NivelFormacaoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: NivelFormacaoFindOneOutputDto | null;
};

const { item: nivelFormacao } = defineProps<Props>();
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !nivelFormacao">
    <UICard
      v-if="nivelFormacao"
      :src="null"
      :title="nivelFormacao.slug"
      variant="block"
    >
      <template #actions>
        <DialogModalEditOrCreateModal
          :edit-id="nivelFormacao.id"
          :form-component="NiveisFormacoesForm"
        />
      </template>

      <UICardLine :text="`Slug: ${nivelFormacao.slug}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
