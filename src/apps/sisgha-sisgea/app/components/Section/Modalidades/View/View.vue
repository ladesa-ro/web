<script lang="ts" setup>
import ModalidadesForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const modalidades = useModalidades();
const { data: modalidade, isLoading, isError } = modalidades.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(ApiImageResource.MODALIDADE_COVER, modalidade);

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: (id) => modalidades.remove(id),
  invalidate: () => modalidades.invalidate(),
  redirectTo: '/sisgha/dape/modalidades',
});
</script>

<template>
  <UIResourceView
    :title="modalidade?.nome ?? ''"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="ModalidadesForm"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="modalidade?.nome" />
        <UIResourceViewField label="Slug" :value="modalidade?.slug" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta modalidade?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
