<script lang="ts" setup>
import CursosForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const cursos = useCursos();
const { data: curso, isLoading, isError } = cursos.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(ApiImageResource.CURSO_COVER, curso);

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: (id) => cursos.remove(id),
  invalidate: () => cursos.invalidate(),
  redirectTo: '/sisgha/dape/cursos',
});
</script>

<template>
  <UIResourceView
    :title="curso?.nome ?? ''"
    :subtitle="curso?.nomeAbreviado"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="CursosForm"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="curso?.nome" />
        <UIResourceViewField label="Abreviação" :value="curso?.nomeAbreviado" />
        <UIResourceViewField
          label="Oferta de Formação"
          :value="curso?.ofertaFormacao?.nome"
        />
        <UIResourceViewField label="Campus" :value="curso?.campus?.apelido" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este curso?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
