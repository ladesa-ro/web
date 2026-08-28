<script lang="ts" setup>
import ProfessorSelector from './-Helpers/ProfessorSelector.vue';
import Grid from './Grid.vue';
import ExceptionsList from './ExceptionsList.vue';
import EditModal from './EditModal.vue';
import type {
  IndisponibilidadeFormPayload,
  IndisponibilidadeItem,
  TipoEntidadeIndisponibilidade,
} from './-Helpers/types';

const props = withDefaults(
  defineProps<{
    tipoEntidade?: TipoEntidadeIndisponibilidade;
    entidadeId?: string | null;
  }>(),
  {
    tipoEntidade: 'professor',
    entidadeId: null,
  }
);

const isProfessor = props.tipoEntidade === 'professor';

const professorComposable = useCalendarioIndisponibilidadeProfessor();
const ambienteComposable = useCalendarioIndisponibilidadeAmbiente();

const selectorValue = ref<string | null>(null);

watch(
  () => props.entidadeId,
  novo => {
    if (novo) selectorValue.value = novo;
  },
  { immediate: true }
);

const showSelector = computed(() => !props.entidadeId && isProfessor);

const effectiveEntidadeId = computed(
  () => props.entidadeId ?? selectorValue.value
);

const queryParams = computed(() => {
  if (!effectiveEntidadeId.value) return undefined;

  return isProfessor
    ? { 'filter.perfil.id': [effectiveEntidadeId.value], limit: 500 }
    : { 'filter.ambiente.id': [effectiveEntidadeId.value], limit: 500 };
});

const { data: professorListData, isLoading: professorIsLoading } =
  professorComposable.list(computed(() => (isProfessor ? queryParams.value : undefined)));

const { data: ambienteListData, isLoading: ambienteIsLoading } =
  ambienteComposable.list(computed(() => (!isProfessor ? queryParams.value : undefined)));

const items = computed<IndisponibilidadeItem[]>(() =>
  isProfessor
    ? (professorListData.value?.data ?? [])
    : (ambienteListData.value?.data ?? [])
);

const isLoading = computed(() =>
  isProfessor ? professorIsLoading.value : ambienteIsLoading.value
);

const weeklyItems = computed(() =>
  items.value.filter(
    item => item.diaSemana !== null && item.diaSemana !== undefined
  )
);
const exceptionItems = computed(() => items.value.filter(item => !!item.data));

const modalOpen = ref(false);
const editingItem = ref<IndisponibilidadeItem | null>(null);
const diaSemanaPreSelecionado = ref<number | null>(null);
const saving = ref(false);

function openCreateFromGrid(diaSemana: number) {
  if (!effectiveEntidadeId.value) return;
  editingItem.value = null;
  diaSemanaPreSelecionado.value = diaSemana;
  modalOpen.value = true;
}

function openCreateException() {
  if (!effectiveEntidadeId.value) return;
  editingItem.value = null;
  diaSemanaPreSelecionado.value = null;
  modalOpen.value = true;
}

function openEdit(item: IndisponibilidadeItem) {
  editingItem.value = item;
  modalOpen.value = true;
}

async function handleSubmit(payload: IndisponibilidadeFormPayload) {
  const entidadeId = effectiveEntidadeId.value;
  if (!entidadeId) return;

  saving.value = true;
  try {
    if (editingItem.value) {
      if (isProfessor) {
        await professorComposable.remove(editingItem.value.id);
      } else {
        await ambienteComposable.remove(editingItem.value.id);
      }
    }

    if (isProfessor) {
      await professorComposable.create({
        perfil: { id: entidadeId },
        ...payload,
      });
      await professorComposable.invalidate();
    } else {
      await ambienteComposable.create({
        ambiente: { id: entidadeId },
        ...payload,
      });
      await ambienteComposable.invalidate();
    }

    modalOpen.value = false;
  } finally {
    saving.value = false;
  }
}

const confirmDelete = useConfirmDelete();
const pendingDelete = ref<IndisponibilidadeItem | null>(null);

function requestDelete(item: IndisponibilidadeItem) {
  pendingDelete.value = item;
  confirmDelete.isOpen.value = true;
}

async function handleConfirmDelete() {
  confirmDelete.onConfirm();
  const item = pendingDelete.value;
  if (!item) return;

  if (isProfessor) {
    await professorComposable.remove(item.id);
    await professorComposable.invalidate();
  } else {
    await ambienteComposable.remove(item.id);
    await ambienteComposable.invalidate();
  }

  pendingDelete.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-if="showSelector" class="w-full sm:w-80">
      <ProfessorSelector v-model="selectorValue" />
    </div>

    <template v-if="!effectiveEntidadeId">
      <div class="text-center text-ldsa-grey py-8">
        {{
          isProfessor
            ? 'Selecione um professor para visualizar as indisponibilidades.'
            : 'Carregando ambiente...'
        }}
      </div>
    </template>

    <template v-else-if="isLoading">
      <div class="text-center text-ldsa-grey py-8">Carregando...</div>
    </template>

    <template v-else>
      <Grid
        :items="weeklyItems"
        @block-click="openEdit"
        @empty-click="openCreateFromGrid"
      />

      <div class="flex items-center justify-between">
        <h2 class="text-sm font-semibold">Exceções pontuais</h2>
        <button
          type="button"
          class="flex items-center gap-1.5 text-sm font-medium text-ldsa-text-green hover:underline"
          @click="openCreateException"
        >
          <IconsAdd class="w-4 h-4" />
          Nova exceção
        </button>
      </div>

      <ExceptionsList
        :items="exceptionItems"
        @edit="openEdit"
        @remove="requestDelete"
      />
    </template>

    <EditModal
      v-model="modalOpen"
      :item="editingItem"
      :dia-semana-pre-selecionado="diaSemanaPreSelecionado"
      :saving="saving"
      @submit="handleSubmit"
    />

    <DialogConfirm
      v-model="confirmDelete.isOpen.value"
      message="Deseja realmente excluir esta indisponibilidade?"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>
