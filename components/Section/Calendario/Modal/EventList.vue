<script lang="ts" setup>
import { ref } from 'vue';
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

const props = defineProps<Props>();

// Code
const searchBarText = ref('');
const isActive = ref<boolean>(props.enableModal);

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

onMounted(async () => {
  // Set value
  filterType.value = await eventFilters.getFilter(
    localValue._orderBy.value,
    props.year
  );

  // Watch selected filters
  watch(localValue._orderBy, async (newValue: string) => {
    if (newValue !== null) {
      // Alter value
      filterType.value = await eventFilters.getFilter(
        localValue._orderBy.value,
        props.year
      );
    }
  });
});
</script>

<template>
  <v-dialog max-width="500" v-model="isActive">
    <template v-slot="{ isActive }">
      <v-card class="dialog-style">
        <!-- Modal -->
        <v-form class="-form">
          <div>
            <!-- Title -->
            <h1 class="main-title">Todos os eventos</h1>

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
              <SectionCalendarioEventsAccordion
                v-for="(item, index) in filterType"
                :name="item.name"
                :year="props.year"
                :month-num="index"
                :steps="props.steps"
                :events="props.events"
                :between-dates="item"
                :order-by="localValue._orderBy.value"
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

.main-title {
  font-size: 24px;
  font-weight: 700;
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
