<script lang="ts" setup>
import { useField } from 'vee-validate';
import { cursoSchema } from './-Helpers/schema';
import FormPrimary from './FormPrimary.vue';
import FormDisciplinas from './FormDisciplinas.vue';
import SelectDisciplinas from './SelectDisciplinas.vue';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const cursos = useCursos();
const confirmDelete = useConfirmDelete();

const cursoQuery = cursos.findOne(computed(() => editId));

const { mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema: cursoSchema,
  editId: computed(() => editId),
  getQuery: cursoQuery,

  create: async data => {
    const { imagem, ...rest } = data;
    rest.periodos = periodos.toPeriodosPayload();
    const created = await cursos.create(rest);
    if (imagem) await cursos.uploadCover(created.id, imagem as Blob);
  },

  update: async (id, data) => {
    const { imagem, ...rest } = data;
    rest.periodos = periodos.toPeriodosPayload();
    await cursos.update(id, rest);
    if (imagem) await cursos.uploadCover(id, imagem as Blob);
  },

  remove: id => cursos.remove(id),

  invalidate: async () => {
    await cursos.invalidate();
  },

  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

// Campo reativo para quantidadePeriodos (fallback evita undefined antes da hidratação do vee-validate)
const { value: quantidadePeriodosField } = useField<number>('quantidadePeriodos');
const quantidadePeriodos = computed(() => quantidadePeriodosField.value ?? 1);

// Composable de períodos/disciplinas
const periodos = useProvideCursoPeriodos(
  mode,
  quantidadePeriodos,
  cursoQuery,
);

// Nome da formação para o modal de seleção
const ofertasFormacoes = useOfertasFormacoes();
const { value: ofertaFormacaoId } = useField<string>('ofertaFormacao.id');
const ofertaFormacaoQuery = ofertasFormacoes.findOne(
  computed(() => ofertaFormacaoId.value || null),
);
const formacaoNome = computed(
  () => ofertaFormacaoQuery.data.value?.nome ?? '',
);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogLayoutSideBySide
      :collapsed="periodos.isEditing.value"
      collapse-target="secondary"
      primary-label="Curso"
      secondary-label="Disciplinas"
    >
      <template #primary>
        <FormPrimary
          :mode="mode"
          :is-busy="isBusy"
          :is-loading="isLoading"
          @close="emit('close')"
          @delete="onDelete"
        />
      </template>

      <template #secondary>
        <FormDisciplinas />
      </template>
    </DialogLayoutSideBySide>

    <DialogManagedDialog
      name="selectDisciplinas"
      :manager="periodos.modals"
      backdrop-action="close-self"
    >
      <SelectDisciplinas
        :periodo-index="periodos.editingPeriodoIndex.value"
        :formacao-nome="formacaoNome"
        :current-disciplina-ids="periodos.currentDisciplinaIds.value"
        :mode="mode"
        @confirm="periodos.confirmDisciplinas"
        @back="periodos.closeSelectDisciplinas"
      />
    </DialogManagedDialog>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir este curso?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
