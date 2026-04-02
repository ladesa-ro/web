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
  create: async data => {
    const { imagem, ...rest } = data;
    const created = await modalidades.create(rest);
    if (imagem && created?.id) await modalidades.uploadCover(created.id, imagem as Blob);
  },
  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await modalidades.update(id, rest);
    if (imagem) await modalidades.uploadCover(id, imagem as Blob);
  },
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
      <VVSelectImage name="imagem" />
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
