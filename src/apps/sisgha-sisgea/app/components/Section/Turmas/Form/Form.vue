<script lang="ts" setup>
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';
import type {
  TurmaCreateInputDto,
  TurmaUpdateInputDto,
} from '@ladesa-ro/web.api.client';
import { useTurmaFormSchema } from './-Helpers/schema';
import SectionTurmasFormAvailability from './Availability/AvailabilityModal.vue';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const isClassesOpen = ref(true);
const isAvailabilityOpen = ref(true);

const availabilityRef = ref<{
  saveAvailability: (overrideTurmaId?: string) => Promise<void>;
  hasPendingSave: boolean;
  invalidateDisponibilidade: () => Promise<void>;
} | null>(null);

const schema = useTurmaFormSchema();
const turmas = useTurmas();
const confirmDelete = useConfirmDelete();

const turmaQuery = turmas.findOne(computed(() => editId));

const cursos = useCursos();
const { value: selectedCursoId } = useField<string | null>('curso.id');
const cursoQuery = cursos.findOne(selectedCursoId);
const campusContext = useCampusContext();
const campusId = computed(() => cursoQuery.data.value?.campus?.id ?? campusContext.value ?? null);

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
      await availabilityRef.value?.saveAvailability(created.id);
    }
  },

  update: async (id, formData) => {
    const data: TurmaUpdateInputDto = {
      curso: formData.curso,
      periodo: formData.periodo,
      ambientePadraoAula: formData.ambientePadraoAula,
    };
    await turmas.update(id, data);
    await availabilityRef.value?.saveAvailability();
  },

  remove: id => turmas.remove(id),
  invalidate: async () => {
    await turmas.invalidate();
    await availabilityRef.value?.invalidateDisponibilidade();
  },
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

const isEditingAvailability = ref(false);

const openSectionsCount = computed(() => {
  if (isEditingAvailability.value) return 1;
  return [isClassesOpen, isAvailabilityOpen].filter(Boolean).length || 1;
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
      v-show="!isEditingAvailability"
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
        v-show="isClassesOpen"
        :disabled="isBusy"
        :is-loading="isLoading"
      />
    </UIFormLayout>

    <SectionTurmasFormAvailability
      v-show="isAvailabilityOpen"
      ref="availabilityRef"
      :turma-id="editId"
      :mode="mode"
      :campus-id="campusId"
      :disabled="isBusy"
      :is-loading="isLoading"
      @update:editing="isEditingAvailability = $event"
    />
  </form>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta turma?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
