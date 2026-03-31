<script lang="ts" setup>
import ModalidadesForm from '../Form/Form.vue';

type Props = { resourceId: string };
const { resourceId } = defineProps<Props>();

const modalidades = useModalidades();
const { data: modalidade, isLoading, isError } = modalidades.findOne(ref(resourceId));

const confirmDelete = useConfirmDelete();
const router = useRouter();

const handleDelete = async () => {
  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    await modalidades.remove(resourceId);
    await modalidades.invalidate();
    router.push('/sisgha/dape/modalidades');
  }
};
</script>

<template>
  <UIResourceView
    :title="modalidade?.nome ?? ''"
    :is-loading="isLoading"
    :is-error="isError"
  >
    <template #header-actions>
      <DialogModalEditOrCreateModal
        :edit-id="resourceId"
        :form-component="ModalidadesForm"
      />
      <UIButtonModalDelete @click="handleDelete" />
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
