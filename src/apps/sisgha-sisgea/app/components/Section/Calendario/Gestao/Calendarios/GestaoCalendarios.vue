<script setup lang="ts">
import { SectionCalendarioForm } from '#components';
import dayjs from 'dayjs';
import Card from './Card.vue';
import { createFilterComputed } from '../-Helpers/createFilterComputed';
import { useProvideCalendarioEvents } from '../../useCalendarioEventBus';

useProvideCalendarioEvents();

const route = useRoute();
const calendarioLetivo = useCalendarioLetivo();
const filtersStore = useCalendarioFiltersStore();

const currentPage = ref(1);
const pageSize = 10;

const statusOptions = [
  { label: 'Em andamento', value: 'EM_ANDAMENTO' },
  { label: 'Finalizado', value: 'FINALIZADO' },
  { label: 'Inativo', value: 'INATIVO' },
];

// Computed wrapper: store.anoLetivo is number, UIFormTextField emits string
const selectedYear = computed({
  get: () => String(filtersStore.anoLetivo),
  set: (val: string | number) => {
    const num = Number(val);
    if (!Number.isNaN(num) && num >= 2020) {
      filtersStore.anoLetivo = num;
    }
  },
});

const selectedStatus = createFilterComputed(
  filtersStore,
  'gestaoCalendariosStatus',
  statusOptions
);

const queryParams = computed(() => {
  const params: Record<string, unknown> = {
    page: currentPage.value,
    limit: pageSize,
  };

  if (filtersStore.searchQuery.trim()) {
    params.search = filtersStore.searchQuery.trim();
  }

  if (filtersStore.anoLetivo) {
    params['filter.ano'] = [String(filtersStore.anoLetivo)];
  }

  if (filtersStore.formacaoId) {
    params['filter.ofertaFormacao.id'] = [filtersStore.formacaoId];
  }

  if (filtersStore.calendarioId) {
    params['filter.id'] = [filtersStore.calendarioId];
  }

  if (filtersStore.gestaoCalendariosStatus) {
    params['filter.status'] = [filtersStore.gestaoCalendariosStatus];
  }

  return params;
});

const { data: result, isLoading, isError } = calendarioLetivo.list(queryParams);

const calendarios = computed(() => result.value?.data ?? []);
const totalPages = computed(() => result.value?.meta?.totalPages ?? 1);

watch(
  () => [
    filtersStore.searchQuery,
    filtersStore.anoLetivo,
    filtersStore.formacaoId,
    filtersStore.calendarioId,
    filtersStore.gestaoCalendariosStatus,
  ],
  () => {
    currentPage.value = 1;
  }
);

// Edit modal
const editCalendarioId = ref<string | null>(null);
const editModalOpen = ref(false);

// Create modal
const createModalOpen = ref(false);

onMounted(() => {
  const calendarioParam = route.query.calendario;
  if (calendarioParam && typeof calendarioParam === 'string') {
    editCalendarioId.value = calendarioParam;
    editModalOpen.value = true;
  }
});

function handleOpenEdit(id: string) {
  editCalendarioId.value = id;
  editModalOpen.value = true;
}

function handleModalClose() {
  editModalOpen.value = false;
  editCalendarioId.value = null;
  createModalOpen.value = false;
  calendarioLetivo.invalidate();
}
</script>

<template>
  <UIContainer class="u-flex u-flex-col u-gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <div class="u-flex u-gap-3-5">
        <NuxtLink
          to="/sisgha/dape/calendario/gestao-calendarios/dias-nao-letivos"
        >
          <UIButtonDefaultSquare>
            <IconsCalendarX class="gestao-calendarios__header-icon u-h-full" />
          </UIButtonDefaultSquare>
        </NuxtLink>

        <UIButtonDefaultSquare @click="createModalOpen = true">
          <IconsAdd class="gestao-calendarios__header-icon u-h-full" />
        </UIButtonDefaultSquare>
      </div>
    </UIBreadcrumbDapeBreadcrumb>

    <!-- Filters -->
    <div class="gestao-calendarios__filters u-flex u-flex-col u-gap-3-5">
      <div class="u-flex u-flex-wrap u-items-end u-gap-3-5">
        <div class="gestao-calendarios__field-year u-w-full">
          <UIFormTextField
            v-model="selectedYear"
            name="calendarYear"
            type="number"
            label="Ano Letivo"
            :placeholder="'Ex: ' + dayjs().year()"
          />
        </div>

        <div class="gestao-calendarios__field-formacao u-w-full">
          <VVAutocompleteAPIOfertaFormacao
            v-model="filtersStore.formacaoId"
            name="filterFormacao"
            label="Formação"
          />
        </div>

        <div class="gestao-calendarios__field-calendario u-w-full">
          <VVAutocompleteAPICalendarioLetivo
            v-model="filtersStore.calendarioId"
            name="filterCalendario"
            label="Calendário"
          />
        </div>

        <div class="gestao-calendarios__field-status u-w-full">
          <UIFormOptionFieldsAutocomplete
            v-model="selectedStatus"
            :items="statusOptions"
            label="Status"
            name="filterStatus"
            placeholder="Todos"
          />
        </div>
      </div>

      <UISearchBar
        v-model="filtersStore.searchQuery"
        placeholder="Pesquisar calendário..."
      />
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="gestao-calendarios__grid u-grid u-gap-5">
      <UICardSkeleton v-for="i in 4" :key="i" />
    </div>

    <!-- Error -->
    <div
      v-else-if="isError"
      class="gestao-calendarios__error u-text-center u-py-8"
    >
      Erro ao carregar calendários. Tente novamente.
    </div>

    <!-- Empty -->
    <UIEmptyState
      v-else-if="calendarios.length === 0"
      description="Nenhum calendário encontrado. Tente ajustar os filtros ou criar um novo calendário."
    />

    <!-- Calendars grid -->
    <div v-else class="gestao-calendarios__grid u-grid u-gap-5">
      <Card
        v-for="calendario in calendarios"
        :key="calendario.id"
        :calendario="calendario"
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
        v-if="editCalendarioId"
        :calendar-id="editCalendarioId"
        edit-mode="calendar"
        @close="handleModalClose"
        @refresh="handleModalClose"
      />
    </DialogSkeleton>

    <!-- Create modal -->
    <DialogSkeleton v-model="createModalOpen">
      <SectionCalendarioForm
        v-if="createModalOpen"
        @close="handleModalClose"
        @refresh="handleModalClose"
      />
    </DialogSkeleton>
  </UIContainer>
</template>

<style scoped>
.gestao-calendarios__header-icon {
  width: 1.5rem;
}

.gestao-calendarios__filters {
  margin-top: -0.375rem;
}

.gestao-calendarios__field-year,
.gestao-calendarios__field-formacao,
.gestao-calendarios__field-calendario,
.gestao-calendarios__field-status {
  width: 100%;
}

@media (min-width: 640px) {
  .gestao-calendarios__field-year {
    width: 7.5rem;
  }

  .gestao-calendarios__field-formacao {
    width: auto;
    flex: 1 1 0%;
    min-width: 12rem;
  }

  .gestao-calendarios__field-calendario {
    width: 13rem;
  }

  .gestao-calendarios__field-status {
    width: 11rem;
  }
}

.gestao-calendarios__grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .gestao-calendarios__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.gestao-calendarios__error {
  color: var(--ladesa-red-color);
}
</style>
