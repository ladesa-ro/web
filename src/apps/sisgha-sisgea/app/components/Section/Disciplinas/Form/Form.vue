<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import {
  ApiImageResource,
  useApiImageRoute,
} from '~/utils/integrations/api/core/images-util';
import { disciplinaSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const disciplinas = useDisciplinas();
const confirmDelete = useConfirmDelete();

const disciplinaQuery = disciplinas.findOne(computed(() => editId));
const coverSrc = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  disciplinaQuery.data
);

const { mode, isBusy, onSubmit, onDelete } = useEntityForm({
  schema: disciplinaSchema,
  editId: computed(() => editId),
  getQuery: disciplinaQuery,

  create: async data => {
    const { imagem, ...rest } = data;
    const created = await disciplinas.create(rest);
    if (imagem) await disciplinas.uploadCover(created.id, imagem);
  },

  update: async (id, data) => {
    const { imagem, ...rest } = data;
    await disciplinas.update(id, rest);
    if (imagem) await disciplinas.uploadCover(id, imagem);
  },

  remove: id => disciplinas.remove(id),
  invalidate: disciplinas.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex items-center justify-center">
    <UIFormLayout
      :title="
        mode === FormMode.MANAGE ? 'Editar Disciplina' : 'Cadastrar Disciplina'
      "
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVSelectImage name="imagem" :existing-src="coverSrc" />
      <VVTextField name="nome" label="Nome" placeholder="Digite aqui" />
      <VVTextField
        name="nomeAbreviado"
        label="Nome Abreviado"
        placeholder="Digite aqui"
      />
      <VVTextField
        name="cargaHoraria"
        label="Carga Horária"
        placeholder="Digite aqui"
        type="number"
      />
    </UIFormLayout>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta disciplina?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
