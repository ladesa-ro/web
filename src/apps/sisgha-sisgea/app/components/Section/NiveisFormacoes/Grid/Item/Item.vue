<script lang="ts" setup>
import NiveisFormacoesForm from '../../Form/Form.vue';
import type { NivelFormacaoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: NivelFormacaoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: nivelFormacao } = props;

const link = props.link === undefined || props.link === '' ? 'niveis-formacoes' : props.link;

const coverImageSrc = useApiImageRoute(ApiImageResource.NIVEL_FORMACAO_COVER, nivelFormacao);
</script>

<template>
  <UICardAutoSkeleton :skeleton="isLoading || !nivelFormacao">
    <UICard
      v-if="nivelFormacao"
      :src="coverImageSrc"
      :title="nivelFormacao.nome ?? nivelFormacao.slug"
      variant="block"
    >
      <template #actions>
        <UICardActions :to="`${link}/${nivelFormacao.id}`">
          <DialogModalEditOrCreateModal :edit-id="nivelFormacao.id" :form-component="NiveisFormacoesForm" />
        </UICardActions>
      </template>

      <UICardLine :text="`Slug: ${nivelFormacao.slug}`" />
    </UICard>
  </UICardAutoSkeleton>
</template>
