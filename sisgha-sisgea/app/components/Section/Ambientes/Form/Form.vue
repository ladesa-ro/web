<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import { ambienteSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const ambientes = useAmbientes();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: ambienteSchema,
  editId: computed(() => editId),
  getQuery: ambientes.findOne(computed(() => editId)),

  create: async (data) => {
    const { imagem, ...rest } = data;
    const created = await ambientes.create(rest);
    if (imagem) await ambientes.uploadCover(created.id, imagem as Blob);
  },

  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await ambientes.update(id, rest);
    if (imagem) await ambientes.uploadCover(id, imagem as Blob);
  },

  remove: (id) => ambientes.remove(id),
  invalidate: ambientes.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="mode === FormMode.MANAGE ? 'Editar Ambiente' : 'Cadastrar Ambiente'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVSelectImage name="imagem" />
      <VVAutocompleteAPIBloco :disabled="mode === FormMode.MANAGE" name="bloco.id" />
      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />
      <VVTextField name="descricao" label="Descrição" placeholder="Digite aqui" />
      <VVTextField name="codigo" label="Código" placeholder="Digite aqui" />
      <VVTextField name="capacidade" label="Capacidade" placeholder="Digite aqui" type="number" />
      <VVTextField name="tipo" label="Tipo" placeholder="Digite aqui" />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este ambiente?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
