<script lang="ts" setup>
import CursosForm from '../../Form/Form.vue';

import type { CursoFindOneOutputDto } from '@ladesa-ro/web.api.client';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = {
  isLoading?: boolean;
  item?: CursoFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: curso } = toRefs(props);

const link = props.link === undefined || props.link === '' ? 'cursos' : props.link;

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso);
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="curso"
    :src="coverImageSrc"
    :title="curso?.nome ?? null"
    :link="link"
    :form-component="CursosForm"
  >
    <UICardLine :text="`Abreviacao: ${curso?.nomeAbreviado}`" />
    <UICardLine :text="`Formacao: ${curso?.ofertaFormacao.nome}`" />
  </UIGenericCrudItem>
</template>
