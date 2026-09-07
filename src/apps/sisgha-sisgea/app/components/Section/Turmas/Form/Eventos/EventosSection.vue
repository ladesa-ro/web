<script lang="ts" setup>
import { FormMode } from '~/utils/constants';

const props = defineProps<{
  disabled?: boolean;
  mode: FormMode;
  turmaId?: string | null;
}>();

const emit = defineEmits<{
  'open-create': [];
  'open-edit': [id: string];
}>();

const {
  visibleEventos,
  removeEvento,
  undoRemove,
  checkExclusivity,
  isExclusive,
  invalidate,
} = useInjectAgendamentos();

const agendamento = useCalendarioAgendamento();

const confirmDelete = useConfirmDelete();
const confirmMessage = ref('');

// Exclusive delete dialog state (3-option: delete / inactivate / cancel)
const exclusiveDeleteDialog = ref(false);
const exclusiveDeleteEventoId = ref<string | null>(null);

const isManageMode = computed(() => props.mode === FormMode.MANAGE);

async function handleEdit(id: string) {
  if (id.startsWith('__temp_')) {
    emit('open-edit', id);
    return;
  }

  await checkExclusivity(id);

  if (isExclusive(id)) {
    emit('open-edit', id);
  } else {
    window.open(
      `/sisgha/dape/calendario/gestao-eventos?evento=${id}`,
      '_blank'
    );
  }
}

async function handleRemove(id: string) {
  if (id.startsWith('__temp_')) {
    removeEvento(id);
    return;
  }

  await checkExclusivity(id);
  const exclusive = isExclusive(id);

  if (exclusive) {
    // Show 3-option dialog: delete / inactivate / cancel
    exclusiveDeleteEventoId.value = id;
    exclusiveDeleteDialog.value = true;
  } else {
    // Shared evento: desvincular from this turma
    const turmaId = props.turmaId;
    if (!turmaId) return;

    confirmMessage.value =
      'Este evento pertence a outras turmas. Deseja desvincular desta turma?';
    const confirmed = await confirmDelete.confirm();
    if (confirmed) {
      try {
        await agendamento.desvincularTurma(id, turmaId);
        await invalidate();
      } catch (e) {
        console.error('Erro ao desvincular turma:', e);
      }
    }
  }
}

async function handleExclusiveDelete() {
  const id = exclusiveDeleteEventoId.value;
  if (!id) return;
  exclusiveDeleteDialog.value = false;
  exclusiveDeleteEventoId.value = null;
  removeEvento(id);
}

async function handleExclusiveInactivate() {
  const id = exclusiveDeleteEventoId.value;
  if (!id) return;
  exclusiveDeleteDialog.value = false;
  exclusiveDeleteEventoId.value = null;

  try {
    await agendamento.updateStatus(id, 'INATIVO');
    await invalidate();
  } catch (e) {
    console.error('Erro ao inativar evento:', e);
  }
}

function handleExclusiveCancel() {
  exclusiveDeleteDialog.value = false;
  exclusiveDeleteEventoId.value = null;
}
</script>

<template>
  <div v-if="isManageMode" class="u-flex u-flex-col u-gap-3 u-pt-2">
    <div class="u-flex u-items-center u-justify-between">
      <div class="eventos-header u-flex u-items-center u-pl-1">
        <span class="eventos-header__title u-font-semibold">
          Eventos
        </span>
      </div>

      <button
        type="button"
        class="eventos-add-button u-flex u-items-center u-justify-center u-rounded-md"
        :disabled="disabled"
        @click="emit('open-create')"
      >
        <IconsAdd class="eventos-add-icon" />
      </button>
    </div>

    <template v-if="visibleEventos.length > 0">
      <SectionTurmasFormEventosList
        :eventos="visibleEventos"
        :disabled="disabled"
        @create="emit('open-create')"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </template>

    <template v-else>
      <p class="eventos-note eventos-note--relaxed u-px-2 u-text-center">
        Nenhum evento registrado. Você pode criar um novo evento pelo botão
        superior direito ou vincular a turma a um evento já existente na
        funcionalidade de "Calendário".
      </p>
    </template>
  </div>

  <div v-else class="u-flex u-flex-col u-gap-3 u-pt-2">
    <div class="eventos-header u-flex u-items-center u-pl-1">
      <span class="eventos-header__title u-font-semibold">
        Eventos
      </span>
    </div>
    <p class="eventos-note u-text-center">
      Salve a turma para gerenciar eventos.
    </p>
  </div>

  <DialogConfirm
    v-model="confirmDelete.isOpen.value"
    :message="confirmMessage"
    @confirm="confirmDelete.onConfirm"
  />

  <!-- Exclusive delete dialog: delete / inactivate / cancel -->
  <DialogSkeleton v-model="exclusiveDeleteDialog">
    <DialogModalBaseLayout
      v-if="exclusiveDeleteDialog"
      title="Remover evento"
      :close-button="true"
      :on-close="handleExclusiveCancel"
    >
      <p class="exclusive-delete-message u-text-center">
        Este evento pertence apenas a esta turma. O que deseja fazer?
      </p>

      <template #button-group>
        <button
          type="button"
          class="exclusive-delete-button--cancel u-flex-1 u-rounded-lg u-px-4 u-py-2 u-text-sm u-font-medium"
          @click="handleExclusiveCancel"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="exclusive-delete-button--inactivate u-flex-1 u-rounded-lg u-px-4 u-py-2 u-text-sm u-font-medium"
          @click="handleExclusiveInactivate"
        >
          Inativar evento
        </button>
        <button
          type="button"
          class="exclusive-delete-button--delete u-flex-1 u-rounded-lg u-px-4 u-py-2 u-text-sm u-font-medium"
          @click="handleExclusiveDelete"
        >
          Deletar evento
        </button>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
.eventos-header {
  height: 13px;
  border-left: 3px solid var(--ladesa-green-1-color);
}

.eventos-header__title {
  font-size: 13px;
  letter-spacing: 0.025em;
  color: var(--ladesa-text-default-color);
}

.eventos-add-button {
  width: 26px;
  height: 26px;
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.eventos-add-button:hover {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 90%);
}

.eventos-add-button:disabled {
  opacity: var(--ui-disabled-opacity);
}

.eventos-add-icon {
  width: 0.75rem;
  height: 0.75rem;
}

.eventos-note {
  font-size: 11px;
  color: var(--ladesa-grey-color);
}

.eventos-note--relaxed {
  line-height: 1.625;
}

.exclusive-delete-message {
  color: var(--ladesa-grey-color);
  margin-inline: auto;
  max-width: 20rem;
  overflow-wrap: break-word;
}

.exclusive-delete-button--cancel {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 30%);
  color: var(--ladesa-text-default-color);
}

.exclusive-delete-button--cancel:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 10%);
}

.exclusive-delete-button--inactivate {
  background-color: rgb(from var(--ladesa-yellow-color) R G B / 90%);
  color: var(--ladesa-white-color);
}

.exclusive-delete-button--inactivate:hover {
  background-color: var(--ladesa-yellow-color);
}

.exclusive-delete-button--delete {
  background-color: var(--ladesa-red-color);
  color: var(--ladesa-white-color);
}

.exclusive-delete-button--delete:hover {
  background-color: rgb(from var(--ladesa-red-color) R G B / 90%);
}
</style>
