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
const { data: coverSrc } = turmas.imageCover(computed(() => editId));

const cursos = useCursos();
const { value: selectedCursoId } = useField<string | null>('curso.id');
const cursoQuery = cursos.findOne(selectedCursoId);
const { value: campusId } = useField<string | null>('campus.id');

// Em edição, preencher campus.id a partir de curso.campus.id
watch(
  () => turmaQuery.data.value?.curso?.campus?.id,
  campusFromCurso => {
    if (campusFromCurso) {
      campusId.value = campusFromCurso;
    }
  },
  { immediate: true },
);

const modeRef = ref<FormMode>(FormMode.CREATE);

const avail = useProvideTurmaAvailability(
  computed(() => editId),
  modeRef,
  campusId
);

const eventosState = useProvideAgendamentos(computed(() => editId));

// Evento dialog management
type EventoDialogName = 'evento-create' | 'evento-edit';
const eventoModals = useModalManager<EventoDialogName>({
  modals: {
    'evento-create': { exclusive: true },
    'evento-edit': { exclusive: true },
  },
});
const editingEventoId = ref<string | null>(null);

function openEventoCreate() {
  eventoModals.open('evento-create');
}

function openEventoEdit(id: string) {
  editingEventoId.value = id;
  eventoModals.open('evento-edit');
}

function closeEventoDialog() {
  eventoModals.closeAll();
  editingEventoId.value = null;
}

const editEventoInitialData = computed(() => {
  if (!editingEventoId.value) return undefined;
  const item = eventosState.mergedEventos.value.find(
    (e: { id: string }) => e.id === editingEventoId.value
  );
  if (!item) return undefined;
  return item.data as Record<string, unknown>;
});

const { mode, isBusy, isLoading, onSubmit, onDelete } = useEntityForm({
  schema,
  editId: computed(() => editId),
  getQuery: turmaQuery,

  create: async formData => {
    const { imagem, campus: _campus, ...rest } = formData;
    const data: TurmaCreateInputDto = {
      curso: rest.curso,
      periodo: rest.periodo,
      ambientePadraoAula: rest.ambientePadraoAula,
    };
    const created = await turmas.create(data);
    if (created?.id) {
      if (imagem) await turmas.uploadCover(created.id, imagem);
      await avail.saveAvailability(created.id);
      await eventosState.saveEventos(created.id);
    }
  },

  update: async (id, formData) => {
    const { imagem, campus: _campus, ...rest } = formData;
    const data: TurmaUpdateInputDto = {
      curso: rest.curso,
      periodo: rest.periodo,
      ambientePadraoAula: rest.ambientePadraoAula,
    };
    await turmas.update(id, data);
    if (imagem) await turmas.uploadCover(id, imagem);
    await avail.saveAvailability();
    await eventosState.saveEventos();
  },

  remove: id => turmas.remove(id),
  invalidate: async () => {
    await turmas.invalidate();
    await avail.invalidateDisponibilidade();
    await eventosState.invalidate();
  },
  confirmDelete: confirmDelete.confirm,
  onFinish: () => emit('close'),
});

watch(
  mode,
  val => {
    modeRef.value = val;
  },
  { immediate: true }
);
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
          <VVSelectImage name="imagem" :existing-src="coverSrc" />

          <VVAutocompleteAPICampusContext :mode="mode" />

          <VVAutocompleteAPICurso
            :is-loading="isLoading"
            :campus-id="campusId ?? undefined"
            :disabled="!campusId"
            name="curso.id"
          />

          <VVAutocompleteAPIAmbiente
            :is-loading="isLoading"
            :campus-id="campusId ?? undefined"
            :disabled="!campusId"
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
          :mode="mode"
          :turma-id="editId"
          @open-evento-create="openEventoCreate"
          @open-evento-edit="openEventoEdit"
        />
      </template>
    </DialogLayoutSideBySide>
  </form>

  <!-- Dialog: Criar Evento -->
  <DialogManagedDialog
    name="evento-create"
    :manager="eventoModals"
    backdrop-action="close-self"
  >
    <SectionTurmasFormEventosEventoForm
      :disabled="isBusy"
      @back="closeEventoDialog"
      @submit="
        (data: Record<string, unknown>) => {
          eventosState.addEvento(data as any);
          closeEventoDialog();
        }
      "
    />
  </DialogManagedDialog>

  <!-- Dialog: Editar Evento -->
  <DialogManagedDialog
    name="evento-edit"
    :manager="eventoModals"
    backdrop-action="close-self"
  >
    <SectionTurmasFormEventosEventoForm
      :key="editingEventoId ?? undefined"
      :edit-id="editingEventoId"
      :initial-data="editEventoInitialData"
      :disabled="isBusy"
      @back="closeEventoDialog"
      @submit="
        (data: Record<string, unknown>) => {
          if (editingEventoId)
            eventosState.updateEvento(editingEventoId, data as any);
          closeEventoDialog();
        }
      "
      @delete="
        () => {
          if (editingEventoId) eventosState.removeEvento(editingEventoId);
          closeEventoDialog();
        }
      "
    />
  </DialogManagedDialog>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    message="Deseja realmente excluir esta turma?"
    @confirm="confirmDelete.onConfirm"
  />
</template>
