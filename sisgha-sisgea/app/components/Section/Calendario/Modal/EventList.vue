<script lang="ts" setup>
import { eventFilters } from '../Functions/EventListFilters';
import type { BetweenDates, Event, Step } from '../Typings';

// Props
type Props = {
  year?: number;
  steps?: Step[];
  events?: Event[];
};

const { year, events } = defineProps<Props>();

// Code
const searchBarText = ref('');
const isActive = ref(false);
const onClose = () => (isActive.value = false);

// Listing filter
const orderBy: Array<string> = ['Mês', 'Eventos', 'Bimestre', 'Semestre'];
const orderType: Array<string> = ['Crescente', 'Decrescente'];

// Select filter
const filterType = ref<BetweenDates[]>([]);

// Local filter value
const localValue = {
  search: ref<string>(''),
  _orderBy: ref<string>(orderBy[0]!),
  _orderType: ref<string>(orderType[0]!),
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
    <template #activator>
      <UIButtonEventsList />
    </template>

    <DialogModalBaseLayout :on-close="onClose" title="Listagem de Eventos">
      <div class="flex flex-col gap-3.5 mt-1.5">
        <UISearchBar v-model="searchBarText" />

        <!-- Order list -->
        <div class="flex flex-row gap-4">
          <VVAutocomplete
            v-model:value="localValue._orderBy.value"
            :items="orderBy"
            class="w-full"
            label="Ordenar por"
            name="orderBy.id"
            placeholder="Mês, eventos..."
          />
          <VVAutocomplete
            v-model:value="localValue._orderType.value"
            :items="orderType"
            class="w-full"
            label="Ordem"
            name="orderType.id"
            placeholder="Ordem"
          />
        </div>
      </div>
      <!-- Content -->
      <div class="flex flex-col gap-4 w-full overflow-y-auto">
        <SectionCalendarioEventsAccordion
          v-for="(item, index) in filterType"
          :between-dates="item"
          :events="events"
          :month-num="index"
          :name="item.name"
          :order-by="localValue._orderBy.value"
          :steps="steps"
          :year="year"
        />
      </div>
    </DialogModalBaseLayout>
  </DialogSkeleton>
</template>
