<script lang="ts" setup>
import ModalidadesForm from '../../Form/Form.vue';
import type { ModalidadeFindOneOutputDto } from '@ladesa-ro/web.api.client';


type Props = {
  isLoading?: boolean;
  item?: ModalidadeFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: modalidade } = toRefs(props);

const link =
  props.link === undefined || props.link === '' ? 'modalidades' : props.link;

const modalidades = useModalidades();
const { data: coverImageSrc } = modalidades.imageCover(computed(() => unref(modalidade)?.id ?? null));
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="modalidade"
    :src="coverImageSrc"
    :title="modalidade?.nome ?? null"
    :link="link"
    :form-component="ModalidadesForm"
  >
    <UICardLine :text="`Slug: ${modalidade?.slug}`" />
  </UIGenericCrudItem>
</template>
