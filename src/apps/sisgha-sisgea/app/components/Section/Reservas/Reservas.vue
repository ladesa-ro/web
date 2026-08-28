<script lang="ts" setup>
import { useForm, useFormValues } from 'vee-validate';

const currentPage = ref(1);
const pageSize = 10;

useForm({
  initialValues: { ambienteId: null as string | null },
});

const formValues = useFormValues();
const filterAmbienteIdValue = computed(
  () => (formValues.value.ambienteId as string | null) ?? null
);

const filterPeriodoInicio = ref<string | null>(null);
const filterPeriodoFim = ref<string | null>(null);

const agendamento = useCalendarioAgendamento();

const queryParams = computed(() => {
  const params: Record<string, unknown> = {
    page: currentPage.value,
    limit: pageSize,
    'filter.tipo': ['RESERVA'],
  };
  if (filterAmbienteIdValue.value) {
    params['filter.ambiente.id'] = [filterAmbienteIdValue.value];
  }
  return params;
});

const { data: result, isLoading, isError } = agendamento.findAll(queryParams);

const reservasBrutas = computed(() => result.value?.data ?? []);
const totalPages = computed(() => result.value?.meta?.totalPages ?? 1);

const reservas = computed(() => {
  return reservasBrutas.value.filter(r => {
    if (filterPeriodoInicio.value && r.dataInicio < filterPeriodoInicio.value) {
      return false;
    }
    if (filterPeriodoFim.value && r.dataInicio > filterPeriodoFim.value) {
      return false;
    }
    return true;
  });
});

watch(
  [filterAmbienteIdValue, filterPeriodoInicio, filterPeriodoFim],
  () => {
    currentPage.value = 1;
  }
);

async function onCancel(id: string) {
  await agendamento.remove(id);
  agendamento.invalidate();
}

function onCreated() {
  agendamento.invalidate();
}
</script>

<template>
  <div
    class="flex flex-1 overflow-auto flex-col items-center gap-8 pb-14 xl:max-w-screen-2xl xl:mx-auto max-xl:mx-16 max-[900px]:text-sm max-[850px]:mx-7"
  >
    <div class="max-w-screen-lg w-full mx-auto mt-14 flex flex-col gap-6">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <UITitle variant="small" text="Reservas de ambientes" />
        <SectionReservasCreateModal @created="onCreated" />
      </div>

      <div class="flex flex-wrap gap-3 items-end">
        <div class="w-full sm:w-56">
          <VVAutocompleteAPIAmbiente name="ambienteId" />
        </div>

        <div class="flex items-end gap-2 w-full sm:w-auto">
          <div class="flex-1 sm:w-40">
            <UIFormTextField
              :model-value="filterPeriodoInicio ?? undefined"
              name="filterPeriodoInicio"
              label="Período início"
              type="date"
              @update:model-value="filterPeriodoInicio = $event || null"
            />
          </div>
          <span class="pb-2 text-ldsa-grey">—</span>
          <div class="flex-1 sm:w-40">
            <UIFormTextField
              :model-value="filterPeriodoFim ?? undefined"
              name="filterPeriodoFim"
              label="Período fim"
              type="date"
              @update:model-value="filterPeriodoFim = $event || null"
            />
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <UICardSkeleton v-for="i in 4" :key="i" />
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="text-center text-ldsa-red py-8">
        Erro ao carregar reservas. Tente novamente.
      </div>

      <!-- Empty -->
      <div
        v-else-if="reservas.length === 0"
        class="flex flex-col justify-center items-center gap-5 py-8"
      >
        <UIContentStateEmpty class="dark:saturate-75 dark:opacity-50" />
        <span class="text-ldsa-grey dark:contrast-0 text-center">
          Nenhuma reserva encontrada. Tente ajustar os filtros ou criar uma
          nova reserva.
        </span>
      </div>

      <!-- Reservas grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionReservasCard
          v-for="reserva in reservas"
          :key="reserva.id"
          :reserva="reserva"
          @cancel="onCancel"
        />
      </div>

      <!-- Pagination -->
      <UIPaginationSimplePagination
        v-model:current-page="currentPage"
        :total-pages="totalPages"
      />
    </div>
  </div>
</template>
