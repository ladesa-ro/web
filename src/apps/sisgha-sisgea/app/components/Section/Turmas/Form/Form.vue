<script lang="ts" setup>
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';
import type {
  TurmaCreateInputDto,
  TurmaUpdateInputDto,
} from '@ladesa-ro/web.api.client';
import { useTurmaFormSchema } from './-Helpers/schema';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const schema = useTurmaFormSchema();
const turmas = useTurmas();
const confirmDelete = useConfirmDelete();

const turmaQuery = turmas.findOne(computed(() => editId));

const cursos = useCursos();
const { value: selectedCursoId } = useField<string | null>('curso.id');
const cursoQuery = cursos.findOne(selectedCursoId);
const campusContext = useCampusContext();
const campusId = computed(() => cursoQuery.data.value?.campus?.id ?? campusContext.value ?? null);

const avail = useProvideTurmaAvailability(
  computed(() => editId),
  computed(() => mode.value),
  campusId
);

const { mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema,
  editId: computed(() => editId),
  getQuery: turmaQuery,

  create: async formData => {
    const data: TurmaCreateInputDto = {
      curso: formData.curso,
      periodo: formData.periodo,
      ambientePadraoAula: formData.ambientePadraoAula,
    };
    const created = await turmas.create(data);
    if (created?.id) {
      await avail.saveAvailability(created.id);
    }
  },

  update: async (id, formData) => {
    const data: TurmaUpdateInputDto = {
      curso: formData.curso,
      periodo: formData.periodo,
      ambientePadraoAula: formData.ambientePadraoAula,
    };
    await turmas.update(id, data);
    await avail.saveAvailability();
  },

  remove: id => turmas.remove(id),
  invalidate: async () => {
    await turmas.invalidate();
    await avail.invalidateDisponibilidade();
  },
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

const openSectionsCount = computed(() => {
  if (avail.isEditing.value) return 1;
  return 2;
});
</script>

<template>
  <form
    class="grid gap-4"
    :style="{
      gridTemplateColumns: `repeat(${openSectionsCount}, 1fr)`,
    }"
    @submit.prevent="onSubmit"
  >
    <UIFormLayout
      v-show="!avail.isEditing.value"
      :title="mode === FormMode.MANAGE ? 'Editar Turma' : 'Cadastrar Turma'"
      :mode="mode"
      :is-busy="isBusy"
      :on-close="() => emit('close')"
      :on-delete="onDelete"
    >
      <VVSelectImage :disabled="isBusy" name="imagem" />

      <VVAutocompleteAPICurso
        :disabled="isBusy"
        :is-loading="isLoading"
        name="curso.id"
      />

      <VVAutocompleteAPIAmbiente
        :disabled="isBusy"
        :is-loading="isLoading"
        label="Sala de Aula"
        name="ambientePadraoAula.id"
      />

      <SectionTurmasFormFieldsPeriodo
        :disabled="isBusy"
        :is-loading="isLoading"
      />
    </UIFormLayout>

    <SectionTurmasFormAvailability
      :disabled="isBusy"
      :is-loading="isLoading"
    />
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta turma?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
