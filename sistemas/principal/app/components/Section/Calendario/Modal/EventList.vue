<script lang="ts" setup>
import { eventFilters } from '../Functions/EventListFilters';
import type { BetweenDates, Event, Step } from '../Typings';

// Dayjs
const dayjs = useDayJs();

// Props
type Props = {
  year?: number;
  steps?: Step[];
  events?: Event[];
  enableModal?: boolean;
};

const { enableModal = false, year, events } = defineProps<Props>();

// Code
const searchBarText = ref('');
const isActive = ref<boolean>(enableModal);
const onClose = () => (isActive.value = false);

// Listing filter
const orderBy: Array<string> = ['Mês', 'Eventos', 'Bimestre', 'Semestre'];
const orderType: Array<string> = ['Crescente', 'Decrescente'];

// Select filter
const filterType = ref<BetweenDates[]>([]);

// Local filter value
const localValue = {
  search: ref<string>(''),
  _orderBy: ref<string>(orderBy[0]),
  _orderType: ref<string>(orderType[0]),
};

onMounted(async () => {
  // Set value
  filterType.value = await eventFilters.getFilter(
    localValue._orderBy.value,
    year
  );

  // Watch selected filters
  watch(localValue._orderBy, async (newValue: string) => {
    if (newValue !== null) {
      // Alter value
      filterType.value = await eventFilters.getFilter(
        localValue._orderBy.value,
        year
      );
    }
  });
});
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <DialogModalBaseLayout title="Listagem de Eventos" :on-close="onClose">
      <form class="form">
        <!-- Filter content -->
        <div class="modal-form">
          <!-- Search event -->
          <UISearchBar
            :value="searchBarText"
            @update:value="searchBarText = $event"
          />

          <!-- Order list -->
          <div class="flex flex-row gap-4">
            <VVAutocomplete
              v-model:value="localValue._orderBy.value"
              name="orderBy.id"
              label="Ordenar por"
              placeholder="Selecione uma opção"
              :items="orderBy"
              class="w-full"
            />
            <VVAutocomplete
              v-model:value="localValue._orderType.value"
              name="orderType.id"
              label="Ordem"
              placeholder="Selecione uma ordem"
              :items="orderType"
              class="w-full"
            />
          </div>
        </div>

        <!-- Content -->
        <div
          class="flex flex-col gap-4 w-full -scrollbar overflow-y-auto pr-2 xl:pr-0 max-h-[432px]"
        >
          <SectionCalendarioEventsAccordion
            v-for="(item, index) in filterType"
            :name="item.name"
            :year="year"
            :month-num="index"
            :steps="steps"
            :events="events"
            :between-dates="item"
            :order-by="localValue._orderBy.value"
          />
        </div>
      </form>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
  overflow: hidden;
  @apply w-full min-w-[24.375rem] p-0 pt-[0.313rem];
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  @apply mb-6;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
}

.button {
  font-weight: 700;
  margin-top: 20px;
  cursor: pointer;
  border: none;
}

.v-btn.buttonCancelar,
.v-btn.buttonCadastro {
  padding: 6px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
}
</style>
