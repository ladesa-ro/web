<script lang="ts" setup>
import CampusForm from '../../Form/Form.vue';
import type { CampusFindOneOutputDto } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  item?: CampusFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: campus } = toRefs(props);

const link = props.link === undefined || props.link === '' ? '/sisgea/campus' : props.link;
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="campus"
    :src="null"
    :title="campus?.apelido ?? null"
    :link="link"
    :form-component="CampusForm"
  >
    <UICardLine :text="`Nome: ${campus?.nomeFantasia}`" />
    <UICardLine :text="`CNPJ: ${campus?.cnpj}`" />
  </UIGenericCrudItem>
</template>
