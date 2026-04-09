<script lang="ts" setup>
import FormacoesForm from '../../Form/Form.vue';

import type { OfertaFormacaoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: OfertaFormacaoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: formacao } = toRefs(props);

const link =
  props.link === undefined || props.link === '' ? 'formacoes' : props.link;

const modalidadeNome = computed(() => formacao.value?.modalidade?.nome ?? '-');

const coverImageSrc = useApiImageRoute(
  ApiImageResource.OFERTA_FORMACAO_COVER,
  formacao
);
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="formacao"
    :src="coverImageSrc"
    :title="formacao?.nome ?? null"
    :link="link"
    :form-component="FormacoesForm"
  >
    <UICardLine :text="`Abreviacao: ${formacao?.slug}`" />
    <UICardLine :text="`Modalidade: ${modalidadeNome}`" />
  </UIGenericCrudItem>
</template>
