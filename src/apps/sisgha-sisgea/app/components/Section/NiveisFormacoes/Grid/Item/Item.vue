<script lang="ts" setup>
import NiveisFormacoesForm from '../../Form/Form.vue';
import type { NivelFormacaoFindOneOutputDto } from '@ladesa-ro/web.api.client';


type Props = {
  isLoading?: boolean;
  item?: NivelFormacaoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: nivelFormacao } = toRefs(props);

const link =
  props.link === undefined || props.link === ''
    ? 'niveis-formacoes'
    : props.link;

const niveisFormacoes = useNiveisFormacoes();
const { data: coverImageSrc } = niveisFormacoes.imageCover(computed(() => unref(nivelFormacao)?.id ?? null));
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
