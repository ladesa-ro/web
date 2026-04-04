<script lang="ts" setup>
import type {
  TurmaCreateInputDto,
  TurmaUpdateInputDto,
} from '@ladesa-ro/web.api.client';
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';
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

const modeRef = ref<FormMode>(FormMode.CREATE);

const avail = useProvideTurmaAvailability(
  computed(() => editId),
  modeRef,
  campusId
);

const { mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema,
  editId: computed(() => editId),
  getQuery: turmaQuery,

  create: async formData => {
    const { imagem, ...rest } = formData;
    const data: TurmaCreateInputDto = {
      curso: rest.curso,
      periodo: rest.periodo,
      ambientePadraoAula: rest.ambientePadraoAula,
    };
    const created = await turmas.create(data);
    if (created?.id) {
      if (imagem) await turmas.uploadCover(created.id, imagem as Blob);
      await avail.saveAvailability(created.id);
    }
  },

  update: async (id, formData) => {
    const { imagem, ...rest } = formData;
    const data: TurmaUpdateInputDto = {
      curso: rest.curso,
      periodo: rest.periodo,
      ambientePadraoAula: rest.ambientePadraoAula,
    };
    await turmas.update(id, data);
    if (imagem) await turmas.uploadCover(id, imagem as Blob);
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

watch(mode, val => { modeRef.value = val; }, { immediate: true });
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogLayoutSideBySide
      :collapsed="avail.isEditing.value"
      collapse-target="secondary"
      primary-label="Turma"
      secondary-label="Disponibilidade"
    >
      <template #primary>
        <UIFormLayout
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
      </template>

      <template #secondary>
        <SectionTurmasFormAvailabilityModal
          :disabled="isBusy"
          :is-loading="isLoading"
        />
      </template>
    </DialogLayoutSideBySide>
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta turma?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
