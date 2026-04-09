<script lang="ts" setup>
import BlocosForm from '~/components/Section/Blocos/Form/Form.vue';
import type { BlocoFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: BlocoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: bloco } = toRefs(props);

const link = props.link === undefined || props.link === '' ? '/sisgea/blocos' : props.link;

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="bloco"
    :src="coverImageSrc"
    :title="bloco?.nome ?? null"
    :link="link"
    :form-component="BlocosForm"
  >
    <UICardLine :text="`${bloco?.nome} - ${bloco?.codigo}`" />
    <UICardLine :text="bloco?.campus.apelido ?? '-'" />
  </UIGenericCrudItem>
</template>
