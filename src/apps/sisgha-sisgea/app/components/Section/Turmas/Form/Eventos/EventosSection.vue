<script lang="ts" setup>
import { FormMode } from '~/utils/constants';

const props = defineProps<{
  disabled?: boolean;
  mode: FormMode;
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
} = useInjectTurmaEventos();

const confirmDelete = useConfirmDelete();
const confirmMessage = ref('');

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
    window.open('/sisgha/dape/calendario', '_blank');
  }
}

async function handleRemove(id: string) {
  if (id.startsWith('__temp_')) {
    removeEvento(id);
    return;
  }

  await checkExclusivity(id);
  const exclusive = isExclusive(id);

  confirmMessage.value = exclusive
    ? 'Deseja realmente excluir este evento?'
    : 'Este evento pertence a outras turmas. Deseja desvincular desta turma?';

  const confirmed = await confirmDelete.confirm();
  if (confirmed) {
    removeEvento(id);
  }
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
</template>
