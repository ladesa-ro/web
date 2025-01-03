<script lang="ts" setup>
import { capitalizeFirst } from '../../Horario/-Helpers/CapitalizeFirst';
import { getOrdenedEventList } from '../Functions/GetOrdenedEventList';
import type { BetweenDates, Event, Step } from '../Typings';

// Dayjs
const dayjs = useDayJs();

// Interface and types

// Props

type Props = {
  year?: number;
  monthNum: number;

  steps?: Step[];
  events?: Event[];
  orderBy: string;

  betweenDates?: BetweenDates;
};

const props = defineProps<Props>();

const orderBy = ref<string>(props.orderBy);

// Functions
// Set event list
const allEventItems = ref<Event[]>([]);

onMounted(async () => {
  allEventItems.value = await getOrdenedEventList(
    props.steps,
    props.events,
    props.year,
    props.monthNum,
    props.orderBy,
    props.betweenDates
  );
});

// Watch
watch(orderBy, async (newValue: string) => {
  if (newValue !== null) {
    // Alter value
    allEventItems.value = await getOrdenedEventList(
      props.steps,
      props.events,
      props.year,
      props.monthNum,
      props.orderBy,
      props.betweenDates
    );
  }
});
</script>

<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel class="border-ldsa-grey border-2 rounded-lg p-2">
        <v-expansion-panel-title
          class="border-none"
          collapse-icon=""
          expand-icon=""
        >
          <div class="flex flex-row justify-between items-center w-full">
            <!-- Title -->
            <p
              class="font-medium text-sm sm:text-[16px] no-underline inline-block"
            >
              <!-- Month -->
              <span v-if="props.orderBy === 'Mês'">
                {{
                  capitalizeFirst(
                    dayjs(`${props.year!}-${props.monthNum! + 1}-01`).format(
                      'MMMM'
                    )
                  )
                }}
              </span>

              <!-- Bimonthly -->
              <span v-else-if="props.orderBy === 'Bimestre'">
                {{ props.betweenDates!.name }}
              </span>

              <!-- Semester -->
              <span v-else-if="props.orderBy === 'Semestre'">
                {{ props.betweenDates!.name }}
              </span>
            </p>
            <div class="icons">
              <IconsArrowIconArrow class="text-ldsa-text-green rotate-[-90deg]" />
            </div>
          </div>
        </v-expansion-panel-title>

        <!-- Content -->
        <v-expansion-panel-text class="h-auto max-h-[400px]">
          <!-- Event list -->
          <div
            class="flex flex-col gap-2 w-full -scrollbar overflow-y-auto pr-2 xl:pr-0 max-h-[300px]"
          >
            <p v-if="allEventItems.length === 0">Nenhum evento encontrado.</p>
            <SectionCalendarioEventsEvent
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
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped></style>
