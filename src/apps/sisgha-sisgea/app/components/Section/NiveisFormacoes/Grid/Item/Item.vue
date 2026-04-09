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

const { item: nivelFormacao } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'niveis-formacoes' : props.link;

const coverImageSrc = useApiImageRoute(ApiImageResource.NIVEL_FORMACAO_COVER, nivelFormacao);
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="nivelFormacao"
    :src="coverImageSrc"
    :title="nivelFormacao?.nome ?? nivelFormacao?.slug ?? null"
    :link="link"
    :form-component="NiveisFormacoesForm"
  >
    <UICardLine :text="`Slug: ${nivelFormacao?.slug}`" />
  </UIGenericCrudItem>
</template>
