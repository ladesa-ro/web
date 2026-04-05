<script setup lang="ts">
import { SectionCalendarioForm } from '#components';
import dayjs from 'dayjs';
import Card from './Card.vue';

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

// Computed wrapper for status autocomplete (object form)
const selectedStatus = computed({
  get: () => {
    const val = filtersStore.gestaoCalendariosStatus;
    return val ? statusOptions.find(o => o.value === val) ?? undefined : undefined;
  },
  set: (opt: { label: string; value: string } | undefined) => {
    filtersStore.gestaoCalendariosStatus = opt?.value ?? null;
  },
});

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
  },
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
  <UIContainer class="flex flex-col gap-6">
    <UIBreadcrumbDapeBreadcrumb>
      <div class="flex gap-3.5">
        <NuxtLink to="/sisgha/dape/calendario/gestao-calendarios/dias-nao-letivos">
          <UIButtonDefaultSquare>
            <IconsCalendarX class="w-6 h-full" />
          </UIButtonDefaultSquare>
        </NuxtLink>

        <UIButtonDefaultSquare @click="createModalOpen = true">
          <IconsAdd class="w-6 h-full" />
        </UIButtonDefaultSquare>
      </div>
    </UIBreadcrumbDapeBreadcrumb>

    <!-- Filters -->
    <div class="flex flex-col gap-3.5 -mt-1.5">
      <div class="flex flex-wrap items-end gap-3.5">
        <div class="w-full sm:w-30">
          <UIFormTextField
            v-model="selectedYear"
            name="calendarYear"
            type="number"
            label="Ano Letivo"
            :placeholder="'Ex: ' + dayjs().year()"
          />
        </div>

        <div class="w-full sm:flex-1 sm:min-w-48">
          <VVAutocompleteAPIOfertaFormacao
            v-model="filtersStore.formacaoId"
            name="filterFormacao"
            label="Formação"
          />
        </div>

        <div class="w-full sm:w-52">
          <VVAutocompleteAPICalendarioLetivo
            v-model="filtersStore.calendarioId"
            name="filterCalendario"
            label="Calendário"
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
      </div>

      <UISearchBar v-model="filtersStore.searchQuery" placeholder="Pesquisar calendário..." />
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <UICardSkeleton v-for="i in 4" :key="i" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="text-center text-ldsa-red py-8">
      Erro ao carregar calendários. Tente novamente.
    </div>

    <!-- Empty -->
    <div v-else-if="calendarios.length === 0" class="flex flex-col justify-center items-center gap-5 py-8">
      <UIContentStateEmpty class="dark:saturate-75 dark:opacity-50" />
      <span class="text-ldsa-grey dark:contrast-0 text-center">
        Nenhum calendário encontrado. Tente ajustar os filtros ou criar um novo calendário.
      </span>
    </div>

    <!-- Calendars grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
