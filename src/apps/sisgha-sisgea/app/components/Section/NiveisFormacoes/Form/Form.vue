<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import { nivelFormacaoSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const niveisFormacoes = useNiveisFormacoes();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: nivelFormacaoSchema,
  editId: computed(() => editId),
  getQuery: niveisFormacoes.findOne(computed(() => editId)),
  create: async data => {
    const { imagem, ...rest } = data;
    const created = await niveisFormacoes.create(rest);
    if (imagem && created?.id) await niveisFormacoes.uploadCover(created.id, imagem);
  },
  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await niveisFormacoes.update(id, rest);
    if (imagem) await niveisFormacoes.uploadCover(id, imagem);
  },
  remove: id => niveisFormacoes.remove(id),
  invalidate: niveisFormacoes.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="
        mode === FormMode.MANAGE
          ? 'Editar Nível de Formação'
          : 'Cadastrar Nível de Formação'
      "
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
    message="Deseja realmente excluir este nível de formação?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
