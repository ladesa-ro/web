<script lang="ts" setup>
import { FormMode } from '~/utils/constants';
import type {
  TurmaCreateInputDto,
  TurmaUpdateInputDto,
} from '~/helpers/api-client';
import { useTurmaFormSchema } from './-Helpers/schema';
import SectionTurmasFormAvailability from './Availability/AvailabilityModal.vue';

const { editId = null } = defineProps<{ editId?: string | null }>();
const emit = defineEmits<{ close: [] }>();

const isClassesOpen = ref(true);
const isAvailabilityOpen = ref(true);

const schema = useTurmaFormSchema();
const turmas = useTurmas();
const confirmDelete = useConfirmDelete();

const { mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema,
  editId: computed(() => editId),
  getQuery: turmas.findOne(computed(() => editId)),

  create: async (formData) => {
    const data: TurmaCreateInputDto = {
      curso: formData.curso,
      periodo: formData.periodo,
      ambientePadraoAula: formData.ambientePadraoAula,
    };
    await turmas.create(data);
  },

  update: async (id, formData) => {
    const data: TurmaUpdateInputDto = {
      curso: formData.curso,
      periodo: formData.periodo,
      ambientePadraoAula: formData.ambientePadraoAula,
    };
    await turmas.update(id, data);
  },

  remove: (id) => turmas.remove(id),
  invalidate: turmas.invalidate,
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex gap-4">
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
        v-show="isClassesOpen"
        :disabled="isBusy"
        :is-loading="isLoading"
      />
    </UIFormLayout>

    <SectionTurmasFormAvailability
      v-show="isAvailabilityOpen"
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
