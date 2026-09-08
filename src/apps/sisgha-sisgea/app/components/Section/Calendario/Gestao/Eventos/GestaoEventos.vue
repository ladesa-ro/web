<script setup lang="ts">
import { SectionCalendarioForm } from '#components';
import Card from './Card.vue';
import { createFilterComputed } from '../-Helpers/createFilterComputed';
import { useProvideCalendarioEvents } from '../../useCalendarioEventBus';

useProvideCalendarioEvents();

const route = useRoute();
const agendamento = useCalendarioAgendamento();
const filtersStore = useCalendarioFiltersStore();

const currentPage = ref(1);
const pageSize = 10;
const showOutrosFiltros = ref(false);

const statusOptions = [
  { label: 'Ativo', value: 'ATIVO' },
  { label: 'Inativo', value: 'INATIVO' },
  { label: 'Rascunho', value: 'RASCUNHO' },
];

const tipoOptions = [
  { label: 'Evento', value: 'EVENTO' },
  { label: 'Aula', value: 'AULA' },
  { label: 'Indisponibilidade', value: 'INDISPONIBILIDADE' },
  { label: 'Reserva', value: 'RESERVA' },
];

const participantesOptions = [
  { label: 'Professores e turmas', value: 'TODOS' },
  { label: 'Só professores', value: 'PROFESSORES' },
  { label: 'Só turmas', value: 'TURMAS' },
];

const selectedStatus = createFilterComputed(
  filtersStore,
  'gestaoEventosStatus',
  statusOptions
);
const selectedTipo = createFilterComputed(
  filtersStore,
  'gestaoEventosTipo',
  tipoOptions
);
const selectedParticipantes = createFilterComputed(
  filtersStore,
  'gestaoEventosParticipantes',
  participantesOptions
);

const queryParams = computed(() => {
  const params: Record<string, unknown> = {
    page: currentPage.value,
    limit: pageSize,
  };
  if (filtersStore.searchQuery.trim())
    params.search = filtersStore.searchQuery.trim();
  if (filtersStore.gestaoEventosStatus)
    params['filter.status'] = [filtersStore.gestaoEventosStatus];
  if (filtersStore.gestaoEventosTipo)
    params['filter.tipo'] = [filtersStore.gestaoEventosTipo];
  if (filtersStore.gestaoEventosCalendarioId)
    params['filter.calendarioLetivo.id'] = [
      filtersStore.gestaoEventosCalendarioId,
    ];
  return params;
});

const { data: result, isLoading, isError } = agendamento.findAll(queryParams);

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const exportDefaultStart = computed(() => {
  const now = new Date();
  now.setDate(now.getDate() - 30);
  return toIsoDate(now);
});

const exportDefaultEnd = computed(() => {
  const now = new Date();
  now.setDate(now.getDate() + 30);
  return toIsoDate(now);
});

const eventos = computed(() => result.value?.data ?? []);
const totalPages = computed(() => result.value?.meta?.totalPages ?? 1);

watch(
  () => [
    filtersStore.searchQuery,
    filtersStore.gestaoEventosStatus,
    filtersStore.gestaoEventosTipo,
    filtersStore.gestaoEventosCalendarioId,
    filtersStore.gestaoEventosParticipantes,
    filtersStore.gestaoEventosPeriodoInicio,
    filtersStore.gestaoEventosPeriodoFim,
  ],
  () => {
    currentPage.value = 1;
  }
);

const editEventoId = ref<string | null>(null);
const editModalOpen = ref(false);

const createModalOpen = ref(false);

onMounted(() => {
  const eventoParam = route.query.evento;
  if (eventoParam && typeof eventoParam === 'string') {
    editEventoId.value = eventoParam;
    editModalOpen.value = true;
  }
});

function handleOpenEdit(id: string) {
  editEventoId.value = id;
  editModalOpen.value = true;
}

function handleModalClose() {
  editModalOpen.value = false;
  editEventoId.value = null;
  createModalOpen.value = false;
  agendamento.invalidate();
}
</script>

<template>
  <UIContainer class="u-flex u-flex-col u-gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <div class="u-flex u-items-center u-gap-2">
        <SectionCalendarioExportIcsModal
          :date-start="
            filtersStore.gestaoEventosPeriodoInicio ?? exportDefaultStart
          "
          :date-end="filtersStore.gestaoEventosPeriodoFim ?? exportDefaultEnd"
          :tipo="filtersStore.gestaoEventosTipo"
        />
        <SectionCalendarioGestaoEventosImportIcsModal
          @imported="agendamento.invalidate()"
        />
        <UIButtonDefaultSquare @click="createModalOpen = true">
          <IconsAdd class="gestao-eventos__header-icon u-h-full" />
        </UIButtonDefaultSquare>
      </div>
    </UIBreadcrumbDapeBreadcrumb>

    <div class="u-flex u-flex-wrap u-gap-3 u-items-end">
      <div class="gestao-eventos__field-w52 u-w-full">
        <VVAutocompleteAPICalendarioLetivo
          v-model="filtersStore.gestaoEventosCalendarioId"
          name="filterCalendario"
          label="Calendário"
        />
      </div>

      <div class="gestao-eventos__field-w52 u-w-full">
        <UIFormOptionFieldsAutocomplete
          v-model="selectedParticipantes"
          :items="participantesOptions"
          label="Participantes"
          name="filterParticipantes"
          placeholder="Todos"
        />
      </div>

      <div class="gestao-eventos__field-w44 u-w-full">
        <UIFormOptionFieldsAutocomplete
          v-model="selectedStatus"
          :items="statusOptions"
          label="Status"
          name="filterStatus"
          placeholder="Todos"
        />
      </div>

      <div
        class="gestao-eventos__periodo-wrap u-flex u-items-end u-gap-2 u-w-full"
      >
        <div class="gestao-eventos__field-w40 u-flex-1">
          <UIFormTextField
            :model-value="filtersStore.gestaoEventosPeriodoInicio ?? undefined"
            name="filterPeriodoInicio"
            label="Período início"
            type="date"
            @update:model-value="
              filtersStore.gestaoEventosPeriodoInicio = $event || null
            "
          />
        </div>
        <span class="gestao-eventos__periodo-sep u-pb-2">—</span>
        <div class="gestao-eventos__field-w40 u-flex-1">
          <UIFormTextField
            :model-value="filtersStore.gestaoEventosPeriodoFim ?? undefined"
            name="filterPeriodoFim"
            label="Período fim"
            type="date"
            @update:model-value="
              filtersStore.gestaoEventosPeriodoFim = $event || null
            "
          />
        </div>
      </div>

      <button
        class="gestao-eventos__filtros-btn u-flex u-items-center u-gap-1-5 u-px-3 u-py-2 u-rounded-lg u-text-sm u-font-medium"
        :class="
          showOutrosFiltros
            ? 'gestao-eventos__filtros-btn--active'
            : 'gestao-eventos__filtros-btn--inactive'
        "
        @click="showOutrosFiltros = !showOutrosFiltros"
      >
        Outros filtros
        <svg
          class="gestao-eventos__chevron"
          :class="{ 'gestao-eventos__chevron--open': showOutrosFiltros }"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div v-if="showOutrosFiltros" class="u-flex u-flex-wrap u-gap-3">
      <div class="gestao-eventos__field-w44 u-w-full">
        <UIFormOptionFieldsAutocomplete
          v-model="selectedTipo"
          :items="tipoOptions"
          label="Tipo"
          name="filterTipo"
          placeholder="Todos"
        />
      </div>
    </div>

    <UISearchBar
      v-model="filtersStore.searchQuery"
      placeholder="Pesquisar evento..."
    />

    <div v-if="isLoading" class="gestao-eventos__grid u-grid u-gap-5">
      <UICardSkeleton v-for="i in 4" :key="i" />
    </div>

    <div v-else-if="isError" class="gestao-eventos__error u-text-center u-py-8">
      Erro ao carregar eventos. Tente novamente.
    </div>

    <UIEmptyState
      v-else-if="eventos.length === 0"
      description="Nenhum evento encontrado. Tente ajustar os filtros ou criar um novo evento."
    />

    <div v-else class="gestao-eventos__grid u-grid u-gap-5">
      <Card
        v-for="evento in eventos"
        :key="evento.id"
        :evento="evento"
        @edit="handleOpenEdit"
      />
    </div>

    <UIPaginationSimplePagination
      v-model:current-page="currentPage"
      :total-pages="totalPages"
    />

    <DialogSkeleton v-model="editModalOpen">
      <SectionCalendarioForm
        v-if="editEventoId"
        :event-id="editEventoId"
        edit-mode="events"
        show-participants
        @close="handleModalClose"
        @refresh="handleModalClose"
      />
    </DialogSkeleton>

    <DialogSkeleton v-model="createModalOpen">
      <SectionCalendarioForm
        v-if="createModalOpen"
        edit-mode="events"
        show-participants
        @close="handleModalClose"
        @refresh="handleModalClose"
      />
    </DialogSkeleton>
  </UIContainer>
</template>

<style scoped>
.gestao-eventos__header-icon {
  width: 1.5rem;
}

.gestao-eventos__field-w52,
.gestao-eventos__field-w44,
.gestao-eventos__periodo-wrap {
  width: 100%;
}

@media (min-width: 640px) {
  .gestao-eventos__field-w52 {
    width: 13rem;
  }

  .gestao-eventos__field-w44 {
    width: 11rem;
  }

  .gestao-eventos__periodo-wrap {
    width: auto;
  }

  .gestao-eventos__field-w40 {
    width: 10rem;
  }
}

.gestao-eventos__periodo-sep {
  color: var(--ladesa-grey-color);
}

.gestao-eventos__filtros-btn {
  border: 1px solid transparent;
  transition:
    color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard),
    background-color var(--ui-duration-base) var(--ui-easing-standard);
}

.gestao-eventos__filtros-btn--active {
  border-color: var(--ladesa-green-1-color);
  color: var(--ladesa-green-1-color);
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.gestao-eventos__filtros-btn--inactive {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
  color: var(--ladesa-grey-color);
}

.gestao-eventos__filtros-btn--inactive:hover {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 60%);
}

.gestao-eventos__chevron {
  width: 1rem;
  height: 1rem;
  transition: transform var(--ui-duration-base) var(--ui-easing-standard);
}

.gestao-eventos__chevron--open {
  transform: rotate(180deg);
}

.gestao-eventos__grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .gestao-eventos__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gestao-eventos__error {
  color: var(--ladesa-red-color);
}
</style>
