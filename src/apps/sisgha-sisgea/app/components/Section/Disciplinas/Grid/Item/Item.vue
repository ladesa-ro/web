<script lang="ts" setup>
import type { DisciplinaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import DisciplinasForm from '../../Form/Form.vue';

type Props = {
  isLoading?: boolean;
  item?: DisciplinaFindOneOutputDto | null;
  link?: string;
};

const props = defineProps<Props>();

const { item: disciplina } = toRefs(props);

const link =
  props.link === undefined || props.link === '' ? 'disciplinas' : props.link;

const disciplinas = useDisciplinas();
const { data: coverImageSrc } = disciplinas.imageCover(computed(() => unref(disciplina)?.id ?? null));
</script>

<template>
  <UIGenericCrudItem
    :is-loading="isLoading"
    :item="disciplina"
    :src="coverImageSrc"
    :title="disciplina?.nome ?? null"
    :link="link"
    :form-component="DisciplinasForm"
  >
    <UICardLine :text="`Carga Horaria: ${disciplina?.cargaHoraria} horas`" />
    <UICardLine :text="`Abreviacao: ${disciplina?.nomeAbreviado}`" />
  </UIGenericCrudItem>
</template>
