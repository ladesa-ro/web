<script lang="ts" setup>
import BlocosForm from '../Form/Form.vue';
import { ApiImageResource, useApiImageRoute } from '~/utils';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const blocos = useBlocos();
const { data: bloco, isLoading, isError } = blocos.findOne(ref(resourceId));

const coverImageSrc = useApiImageRoute(ApiImageResource.BLOCO_COVER, bloco);

const { confirmDelete, handleDelete } = useResourceDelete({
  remove: (id) => blocos.remove(id),
  invalidate: () => blocos.invalidate(),
  redirectTo: '/sisgea/blocos',
});
</script>

<template>
  <UIResourceView
    :title="bloco?.nome ?? ''"
    :subtitle="bloco?.codigo"
    :image-src="coverImageSrc"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #breadcrumb />

    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="BlocosForm"
      />
      <UIButtonModalDelete @click="handleDelete(resourceId)" />
    </template>

    <template #details>
      <UIResourceViewFieldGroup>
        <UIResourceViewField label="Nome" :value="bloco?.nome" />
        <UIResourceViewField label="Código" :value="bloco?.codigo" />
        <UIResourceViewField label="Campus" :value="bloco?.campus?.apelido" />
      </UIResourceViewFieldGroup>
    </template>
  </UIResourceView>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este bloco?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
