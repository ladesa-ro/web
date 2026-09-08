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
    class="u-flex u-flex-1 u-overflow-auto u-flex-col u-items-center u-gap-8 reservas"
  >
    <div class="u-w-full u-flex u-flex-col u-gap-6 reservas__content">
      <div class="u-flex u-items-center u-justify-between u-gap-3 u-flex-wrap">
        <UITitle variant="small" text="Reservas de ambientes" />
        <SectionReservasCreateModal @created="onCreated" />
      </div>

      <div class="u-flex u-flex-wrap u-gap-3 u-items-end">
        <div class="u-w-full reservas__filter-ambiente">
          <VVAutocompleteAPIAmbiente name="ambienteId" />
        </div>

        <div class="u-flex u-items-end u-gap-2 u-w-full reservas__filter-periodo">
          <div class="u-flex-1 reservas__filter-periodo-field">
            <UIFormTextField
              :model-value="filterPeriodoInicio ?? undefined"
              name="filterPeriodoInicio"
              label="Período início"
              type="date"
              @update:model-value="filterPeriodoInicio = $event || null"
            />
          </div>
          <span class="u-pb-2 reservas__filter-separator">—</span>
          <div class="u-flex-1 reservas__filter-periodo-field">
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

      <div v-if="isLoading" class="u-grid u-gap-5 reservas__cards-grid">
        <UICardSkeleton v-for="i in 4" :key="i" />
      </div>

      <div v-else-if="isError" class="u-text-center u-py-8 reservas__error">
        Erro ao carregar reservas. Tente novamente.
      </div>

      <UIEmptyState
        v-else-if="reservas.length === 0"
        description="Nenhuma reserva encontrada. Tente ajustar os filtros ou criar uma nova reserva."
      />

      <div v-else class="u-grid u-gap-5 reservas__cards-grid">
        <SectionReservasCard
          v-for="reserva in reservas"
          :key="reserva.id"
          :reserva="reserva"
          @cancel="onCancel"
        />
      </div>

      <UIPaginationSimplePagination
        v-model:current-page="currentPage"
        :total-pages="totalPages"
      />
    </div>
  </div>
</template>

<style scoped>
.reservas {
  padding-bottom: 3.5rem;
}

@media (min-width: 1280px) {
  .reservas {
    max-width: 1536px;
    margin-inline: auto;
  }
}

@media (max-width: 1279px) {
  .reservas {
    margin-inline: 4rem;
  }
}

@media (max-width: 900px) {
  .reservas {
    font-size: 0.875rem;
  }
}

@media (max-width: 850px) {
  .reservas {
    margin-inline: var(--ui-space-7);
  }
}

.reservas__content {
  max-width: 1024px;
  margin-inline: auto;
  margin-top: 3.5rem;
}

.reservas__filter-ambiente {
  width: 100%;
}

@media (min-width: 640px) {
  .reservas__filter-ambiente {
    width: 14rem;
  }
}

@media (min-width: 640px) {
  .reservas__filter-periodo {
    width: auto;
  }
}

@media (min-width: 640px) {
  .reservas__filter-periodo-field {
    width: 10rem;
  }
}

.reservas__filter-separator {
  color: var(--ladesa-grey-color);
}

.reservas__cards-grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .reservas__cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.reservas__error {
  color: var(--ladesa-red-color);
}

</style>
