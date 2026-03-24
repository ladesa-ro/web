<script lang="ts" setup>
import { modalidadeSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const modalidades = useModalidades();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: modalidadeSchema,
  editId: computed(() => editId),
  getQuery: modalidades.findOne(computed(() => editId)),
  create: data => modalidades.create(data),
  update: (id, data) => modalidades.update(id, data),
  remove: id => modalidades.remove(id),
  invalidate: modalidades.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="mode === 'manage' ? 'Editar Modalidade' : 'Cadastrar Modalidade'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />
      <VVTextField name="slug" label="Slug" placeholder="Digite aqui" />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta modalidade?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
