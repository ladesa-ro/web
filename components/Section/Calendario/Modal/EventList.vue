<script lang="ts" setup>
import { ref } from 'vue';
import { eventFilters } from '../Functions/EventListFilters';
import {
  getOrdenedItemList,
  getOrdenedTypeAccordionList,
  getOrdenedTypeEventList,
} from '../Functions/GetOrdenedList';
import type { BetweenDates, Event, Step } from '../Typings';

// Dayjs
const dayjs = useDayJs();

// Props
type Props = {
  showButton: boolean;
  year?: number;
  steps?: Step[];
  events?: Event[];
};

const props = defineProps<Props>();

// Code
const searchBarText = ref('');
const isActive = ref<boolean>(false);

// Listing filter
const orderBy: Array<string> = ['Mês', 'Eventos', 'Bimestre', 'Semestre'];
const orderType: Array<string> = ['Crescente', 'Decrescente'];

// Select filter
let filterType = ref<BetweenDates[]>([]);

// Local filter value
let localValue = {
  search: ref<string>(''),
  _orderBy: ref<string>(orderBy[0]),
  _orderType: ref<string>(orderType[0]),
};

let allEventItems = ref<Event[]>([]);

onMounted(async () => {
  // Set value
  filterType.value = await eventFilters.getFilter(
    localValue._orderBy.value,
    props.year!
  );

  allEventItems.value = await getOrdenedItemList(
    props.steps,
    props.events,
    props.year,
    undefined
  );
});

// Watch selected filters
watch(
  [() => localValue._orderBy.value, () => localValue._orderType.value],
  async ([newValue1, newValue2]) => {
    if (newValue1 !== null) {
      // Alter value
      filterType.value = await eventFilters.getFilter(newValue1, props.year!);
    }

    // Order type of list
    if (newValue2) {
      if (newValue1 === 'Eventos') {
        allEventItems.value = await getOrdenedTypeEventList(
          newValue2,
          allEventItems.value
        );
      } else {
        filterType.value = await getOrdenedTypeAccordionList(
          newValue1,
          newValue2,
          filterType.value
        );
      }
    }
  }
);
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <UIButtonEventsList v-show="props.showButton" v-bind="activatorProps" />
    </template>

    <template v-slot:="{ isActive }">
      <v-card class="dialog-style">
        <!-- Modal -->
        <v-form class="-form">
          <div>
            <!-- Title -->
            <h1 class="dialog-title text-left flex-1 w-full">
              <span>Todos os Eventos</span>
            </h1>

            <v-divider class="my-4" />

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
                  name="orderBy.id"
                  label="Ordenar por"
                  placeholder="Selecione uma opção"
                  :items="orderBy"
                  v-model:value="localValue._orderBy.value"
                  class="w-full"
                />
                <VVAutocomplete
                  name="orderType.id"
                  label="Ordem"
                  placeholder="Selecione uma ordem"
                  :items="orderType"
                  v-model:value="localValue._orderType.value"
                  class="w-full"
                />
              </div>
            </div>

            <v-divider class="my-4" />

            <!-- Content -->
            <div
              class="flex flex-col gap-4 w-full -scrollbar overflow-y-auto pr-2 xl:pr-0 max-h-[432px]"
            >
              <!-- Accordion -->
              <SectionCalendarioEventsAccordion
                v-show="localValue._orderBy.value !== 'Eventos'"
                v-for="(item, index) in filterType"
                :name="item.name"
                :year="props.year"
                :month-num="index"
                :steps="props.steps"
                :events="props.events"
                :between-dates="item"
                :order-by="localValue._orderBy.value"
              />

              <!-- Event list -->
              <p
                v-if="allEventItems.length === 0"
                v-show="localValue._orderBy.value === 'Eventos'"
              >
                Nenhum evento encontrado.
              </p>
              <SectionCalendarioEventsEvent
                v-else
                v-show="localValue._orderBy.value === 'Eventos'"
                v-for="event in allEventItems"
                :id="event.id"
                :key="event.id"
                :name="event.name"
                :color="event.color"
                :locale="event.locale"
                :start-date="event.startDate"
                :end-date="event.endDate"
                :notify-status="event.notifyStatus"
              />
            </div>

            <!-- Footer -->
            <div class="form-footer button-group">
              <UIButtonModalCancelButton
                class="w-full"
                @click="isActive.value = false"
              />
            </div>
          </div>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
}

.detail {
  cursor: pointer;
  z-index: 10;
  margin-right: 16px;
}

.-form {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 32px;
  overflow: auto;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-title {
  font-size: 24px;
  font-weight: 700;

  display: flex;
  align-items: center;
}

.dialog-title::before {
  content: '';
  display: block;
  width: 6px;
  height: 0.75lh;
  background: #15803d;
  margin-right: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 20px;
  gap: 20px;
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

@media screen and (max-width: 450px) {
  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .v-btn.buttonCancelar,
  .v-btn.buttonCadastro {
    padding: 6px 20px;
  }
}
</style>
