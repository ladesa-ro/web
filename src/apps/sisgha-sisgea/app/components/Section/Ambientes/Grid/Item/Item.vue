<script lang="ts" setup>
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';
import type { AmbienteFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: AmbienteFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: ambiente } = toRefs(props);

const link =
  props.link === undefined || props.link === ''
    ? '/sisgea/ambientes'
    : props.link;

const coverImageSrc = useApiImageRoute(
  ApiImageResource.AMBIENTE_COVER,
  ambiente
);
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="ambiente"
    :src="coverImageSrc"
    :title="ambiente?.nome ?? null"
    :link="link"
    :form-component="AmbientesForm"
  >
    <UICardLine :text="ambiente?.bloco.nome ?? '-'" />
    <UICardLine :text="`Capacidade: ${ambiente?.capacidade} pessoas`" />
  </UIGenericCrudItem>
</template>
