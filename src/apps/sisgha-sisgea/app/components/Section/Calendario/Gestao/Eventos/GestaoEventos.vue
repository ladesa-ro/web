<script setup lang="ts">
import { SectionCalendarioForm } from '#components';
import Card from './Card.vue';

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

// Computed wrappers for autocomplete v-model (object form)
const selectedStatus = computed({
  get: () => {
    const val = filtersStore.gestaoEventosStatus;
    return val
      ? (statusOptions.find(o => o.value === val) ?? undefined)
      : undefined;
  },
  set: (opt: { label: string; value: string } | undefined) => {
    filtersStore.gestaoEventosStatus = opt?.value ?? null;
  },
});

const selectedTipo = computed({
  get: () => {
    const val = filtersStore.gestaoEventosTipo;
    return val
      ? (tipoOptions.find(o => o.value === val) ?? undefined)
      : undefined;
  },
  set: (opt: { label: string; value: string } | undefined) => {
    filtersStore.gestaoEventosTipo = opt?.value ?? null;
  },
});

const selectedParticipantes = computed({
  get: () => {
    const val = filtersStore.gestaoEventosParticipantes;
    return val
      ? (participantesOptions.find(o => o.value === val) ?? undefined)
      : undefined;
  },
  set: (opt: { label: string; value: string } | undefined) => {
    filtersStore.gestaoEventosParticipantes = opt?.value ?? null;
  },
});

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

// Edit modal
const editEventoId = ref<string | null>(null);
const editModalOpen = ref(false);

// Create modal
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
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <UIButtonDefaultSquare @click="createModalOpen = true">
        <IconsAdd class="w-6 h-full" />
      </UIButtonDefaultSquare>
    </UIBreadcrumbDapeBreadcrumb>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3 items-end">
      <div class="w-full sm:w-52">
        <VVAutocompleteAPICalendarioLetivo
          v-model="filtersStore.gestaoEventosCalendarioId"
          name="filterCalendario"
          label="Calendário"
        />
      </div>

      <div class="w-full sm:w-52">
        <UIFormOptionFieldsAutocomplete
          v-model="selectedParticipantes"
          :items="participantesOptions"
          label="Participantes"
          name="filterParticipantes"
          placeholder="Todos"
        />
      </div>

      <div class="w-full sm:w-44">
        <UIFormOptionFieldsAutocomplete
          v-model="selectedStatus"
          :items="statusOptions"
          label="Status"
          name="filterStatus"
          placeholder="Todos"
        />
      </div>

      <div class="flex items-end gap-2 w-full sm:w-auto">
        <div class="flex-1 sm:w-40">
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
        <span class="pb-2 text-ldsa-grey">—</span>
        <div class="flex-1 sm:w-40">
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
        class="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors"
        :class="
          showOutrosFiltros
            ? 'border-ldsa-green-1 text-ldsa-green-1 bg-ldsa-green-1/10'
            : 'border-ldsa-grey/30 text-ldsa-grey hover:border-ldsa-grey/60'
        "
        @click="showOutrosFiltros = !showOutrosFiltros"
      >
        Outros filtros
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': showOutrosFiltros }"
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

    <!-- Outros filtros (expandable) -->
    <div v-if="showOutrosFiltros" class="flex flex-wrap gap-3">
      <div class="w-full sm:w-44">
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

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <UICardSkeleton v-for="i in 4" :key="i" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="text-center text-ldsa-red py-8">
      Erro ao carregar eventos. Tente novamente.
    </div>

    <!-- Empty -->
    <div
      v-else-if="eventos.length === 0"
      class="flex flex-col justify-center items-center gap-5 py-8"
    >
      <UIContentStateEmpty class="dark:saturate-75 dark:opacity-50" />
      <span class="text-ldsa-grey dark:contrast-0 text-center">
        Nenhum evento encontrado. Tente ajustar os filtros ou criar um novo
        evento.
      </span>
    </div>

    <!-- Events grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card
        v-for="evento in eventos"
        :key="evento.id"
        :evento="evento"
        @edit="handleOpenEdit"
      />
    </div>

    <!-- Pagination -->
    <UIPaginationSimplePagination
      v-model:current-page="currentPage"
      :total-pages="totalPages"
    />

    <!-- Edit modal -->
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

    <!-- Create modal -->
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
