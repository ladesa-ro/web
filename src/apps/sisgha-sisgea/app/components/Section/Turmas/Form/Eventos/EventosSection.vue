<script lang="ts" setup>
import {
  calendarioAgendamentoUpdateStatus,
  calendarioAgendamentoDesvincularTurma,
} from '@ladesa-ro/web.api.client';
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

const api = useApiClient();

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
    window.open(`/sisgha/dape/calendario/gestao-eventos?evento=${id}`, '_blank');
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

    confirmMessage.value = 'Este evento pertence a outras turmas. Deseja desvincular desta turma?';
    const confirmed = await confirmDelete.confirm();
    if (confirmed) {
      try {
        await api.call(calendarioAgendamentoDesvincularTurma, {
          path: { id, turmaId },
        });
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
    await api.call(calendarioAgendamentoUpdateStatus, {
      path: { id },
      body: { status: 'INATIVO' },
    });
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
  <div v-if="isManageMode" class="flex flex-col gap-3 pt-2">
    <div class="flex items-center justify-between">
      <div class="flex h-[13px] items-center border-l-3 border-ldsa-green-1 pl-1">
        <span class="text-[13px] font-semibold tracking-wide text-ldsa-text-default">
          Eventos
        </span>
      </div>

      <button
        type="button"
        class="flex size-[26px] items-center justify-center rounded-md bg-ldsa-green-1 text-white hover:bg-ldsa-green-1/90 disabled:opacity-50"
        :disabled="disabled"
        @click="emit('open-create')"
      >
        <IconsAdd class="size-3" />
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
      <p class="px-2 text-center text-[11px] leading-relaxed text-ldsa-grey">
        Nenhum evento registrado. Você pode criar um novo evento pelo
        botão superior direito ou vincular a turma a um evento já
        existente na funcionalidade de "Calendário".
      </p>
    </template>
  </div>

  <div v-else class="flex flex-col gap-3 pt-2">
    <div class="flex h-[13px] items-center border-l-3 border-ldsa-green-1 pl-1">
      <span class="text-[13px] font-semibold tracking-wide text-ldsa-text-default">
        Eventos
      </span>
    </div>
    <p class="text-center text-[11px] text-ldsa-grey">
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
      <p class="text-ldsa-grey text-center mx-auto max-w-[20rem] break-words">
        Este evento pertence apenas a esta turma. O que deseja fazer?
      </p>

      <template #button-group>
        <button
          type="button"
          class="flex-1 rounded-lg border border-ldsa-grey/30 px-4 py-2 text-sm font-medium text-ldsa-text-default hover:bg-ldsa-grey/10"
          @click="handleExclusiveCancel"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="flex-1 rounded-lg bg-ldsa-yellow/90 px-4 py-2 text-sm font-medium text-white hover:bg-ldsa-yellow"
          @click="handleExclusiveInactivate"
        >
          Inativar evento
        </button>
        <button
          type="button"
          class="flex-1 rounded-lg bg-ldsa-red px-4 py-2 text-sm font-medium text-white hover:bg-ldsa-red/90"
          @click="handleExclusiveDelete"
        >
          Deletar evento
        </button>
      </template>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
