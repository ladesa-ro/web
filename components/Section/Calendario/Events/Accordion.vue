<script lang="ts" setup>
// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import isBetween from 'dayjs/plugin/isBetween';

// Import functions
import { getOrdenedEventList } from '../Functions/GetOrdenedEventList';

// Dayjs config
dayjs.locale('pt-br');
dayjs.extend(isBetween);

// Interface and types
type EventData = {
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  color: string;
  notifyStatus: boolean;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  locale?: string;
};

// Filter types
type BetweenDates = Omit<EventData, 'id' | 'color' | 'notifyStatus'> & {
  name: string;
};

// Props
const props = defineProps({
  year: Number,
  monthNum: Number,
  steps: Array<Step>,
  events: Array<Event>,
  orderBy: String,
  betweenDates: {
    type: Object as PropType<BetweenDates>,
    required: false,
  },
});

const orderBy = ref<string>(props.orderBy!);

// Functions
// Set event list
let allEventItems = ref<Event[]>([]);

onMounted(async () => {
  allEventItems.value = await getOrdenedEventList(
    props.steps!,
    props.events!,
    props.year!,
    props.monthNum!,
    props.orderBy!,
    props.betweenDates!
  );

  // Watch
  watch(orderBy!, async (newValue: string) => {
    if (newValue !== null) {
      // Alter value
      allEventItems.value = await getOrdenedEventList(
        props.steps!,
        props.events!,
        props.year!,
        props.monthNum!,
        props.orderBy!,
        props.betweenDates!
      );
    }
  });
});
</script>

<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel class="border-[#9AB69E] border-2 rounded-lg p-2">
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
                  dayjs(`${props.year!}-${props.monthNum! + 1}-01`)
                    .format('MMMM')[0]
                    .toUpperCase() +
                  dayjs(`${props.year!}-${props.monthNum! + 1}-01`)
                    .format('MMMM')
                    .slice(1)
                    .toLowerCase()
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
              <IconsArrowIconArrow class="text-[#118D3B] rotate-[-90deg]" />
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
