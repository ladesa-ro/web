<script lang="ts" setup>
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

const availabilityRef = ref<{ saveAvailability: () => Promise<void>; hasPendingSave: boolean } | null>(null);

const schema = useTurmaFormSchema();
const turmas = useTurmas();
const confirmDelete = useConfirmDelete();

const turmaQuery = turmas.findOne(computed(() => editId));

const campusId = computed(() => {
  const data = turmaQuery.data.value as {
    curso?: { campus?: { id?: string } };
  } | null;
  return data?.curso?.campus?.id ?? null;
});

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
    await turmas.create(data);
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
  invalidate: turmas.invalidate,
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
    @submit.prevent="onSubmit"
    class="grid gap-4"
    :style="{
      gridTemplateColumns: `repeat(${openSectionsCount}, 1fr)`,
    }"
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
      ref="availabilityRef"
      v-show="isAvailabilityOpen"
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
