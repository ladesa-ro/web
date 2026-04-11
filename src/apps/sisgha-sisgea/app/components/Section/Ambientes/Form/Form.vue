<script lang="ts" setup>
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';
import { ambienteSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const ambientes = useAmbientes();
const confirmDelete = useConfirmDelete();

const ambienteQuery = ambientes.findOne(computed(() => editId));
const { data: coverSrc } = ambientes.imageCover(computed(() => editId));

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: ambienteSchema,
  editId: computed(() => editId),
  getQuery: ambienteQuery,

  create: async data => {
    const { imagem, campus: _campus, ...rest } = data;
    const created = await ambientes.create(rest);
    if (imagem) await ambientes.uploadCover(created.id, imagem);
  },

  update: async (id, data) => {
    const { imagem, campus: _campus, ...rest } = data;
    await ambientes.update(id, rest);
    if (imagem) await ambientes.uploadCover(id, imagem);
  },

  remove: id => ambientes.remove(id),
  invalidate: ambientes.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

const { value: campusId } = useField<string | null>('campus.id');

// Em edição, preencher campus.id a partir de bloco.campus.id
watch(
  () => ambienteQuery.data.value?.bloco?.campus?.id,
  campusFromBloco => {
    if (campusFromBloco) {
      campusId.value = campusFromBloco;
    }
  },
  { immediate: true },
);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UIFormLayout
      :title="
        mode === FormMode.MANAGE ? 'Editar Ambiente' : 'Cadastrar Ambiente'
      "
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVSelectImage name="imagem" :existing-src="coverSrc" />

      <VVAutocompleteAPICampusContext :mode="mode" />

      <VVAutocompleteAPIBloco
        :disabled="!campusId || mode === FormMode.MANAGE"
        :campus-id="campusId ?? undefined"
        name="bloco.id"
      />

      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />
      <VVTextField
        name="descricao"
        label="Descrição"
        placeholder="Digite aqui"
      />
      <VVTextField name="codigo" label="Código" placeholder="Digite aqui" />
      <VVTextField
        name="capacidade"
        label="Capacidade"
        placeholder="Digite aqui"
        type="number"
      />
      <VVTextField name="tipo" label="Tipo" placeholder="Digite aqui" />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este ambiente?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
