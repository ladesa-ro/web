<script lang="ts" setup>
import { nivelFormacaoSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const niveisFormacoes = useNiveisFormacoes();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: nivelFormacaoSchema,
  editId: computed(() => editId),
  getQuery: niveisFormacoes.findOne(computed(() => editId)),
  create: (data) => niveisFormacoes.create(data),
  update: (id, data) => niveisFormacoes.update(id, data),
  remove: (id) => niveisFormacoes.remove(id),
  invalidate: niveisFormacoes.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="mode === 'manage' ? 'Editar Nível de Formação' : 'Cadastrar Nível de Formação'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVTextField name="slug" label="Slug" placeholder="Digite aqui" />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este nível de formação?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
