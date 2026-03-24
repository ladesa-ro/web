<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import { cursoSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const cursos = useCursos();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: cursoSchema,
  editId: computed(() => editId),
  getQuery: cursos.findOne(computed(() => editId)),

  create: async data => {
    const { imagem, ...rest } = data;
    const created = await cursos.create(rest);
    if (imagem) await cursos.uploadCover(created.id, imagem as Blob);
  },

  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await cursos.update(id, rest);
    if (imagem) await cursos.uploadCover(id, imagem as Blob);
  },

  remove: id => cursos.remove(id),
  invalidate: cursos.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="mode === FormMode.MANAGE ? 'Editar Curso' : 'Cadastrar Curso'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVSelectImage name="imagem" />
      <VVAutocompleteAPIOfertaFormacao name="ofertaFormacao.id" />
      <VVAutocompleteAPICampus name="campus.id" />
      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />
      <VVTextField
        name="nomeAbreviado"
        label="Nome Abreviado"
        placeholder="Digite aqui"
      />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este curso?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
