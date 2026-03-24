<script lang="ts" setup>
import { blocoSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const blocos = useBlocos();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: blocoSchema,
  editId: computed(() => editId),
  getQuery: blocos.findOne(computed(() => editId)),
  create: async (data) => {
    const { imagem, ...rest } = data;
    const created = await blocos.create(rest);
    if (imagem) await blocos.uploadCover(created.id, imagem as Blob);
  },
  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await blocos.update(id, rest);
    if (imagem) await blocos.uploadCover(id, imagem as Blob);
  },
  remove: (id) => blocos.remove(id),
  invalidate: blocos.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="mode === 'manage' ? 'Editar Bloco' : 'Cadastrar Bloco'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVSelectImage name="imagem" />
      <VVAutocompleteAPICampus :disabled="mode === 'manage'" name="campus.id" />
      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />
      <VVTextField name="codigo" label="Código" placeholder="Digite aqui" />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este bloco?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
