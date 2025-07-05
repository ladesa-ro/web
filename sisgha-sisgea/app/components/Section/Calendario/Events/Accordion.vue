<script lang="ts" setup>
import { capitalizeFirst } from '../../Horario/-Helpers/CapitalizeFirst';
import { getOrdenedEventList } from '../Functions/GetOrdenedEventList';
import type { BetweenDates, Event, Step } from '../Typings';

const dayjs = useDayJs();

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
  <UICollapsible>
    <template #trigger>
      <div class="flex flex-row justify-between items-center w-full">
        <!-- Title -->
        <p class="font-medium text-sm sm:text-[16px] no-underline inline-block">
          <!-- Month -->
          <span v-if="props.orderBy === 'Mês'">
            {{
              capitalizeFirst(
                dayjs(`${props.year!}-${props.monthNum! + 1}-01`).format('MMMM')
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
          <IconsArrow class="text-ldsa-text-green rotate-[-90deg]" />
        </div>
      </div>
    </template>

    <template #default>
      <div
        class="flex flex-col gap-2 w-full overflow-y-auto pr-2 xl:pr-0 max-h-[300px]"
      >
        <p v-if="allEventItems.length === 0">Nenhum evento encontrado.</p>
        <SectionCalendarioEventsEvent
          v-for="event in allEventItems"
          :id="event.id"
          :key="event.id"
          :color="event.color"
          :end-date="event.endDate"
          :locale="event.locale"
          :name="event.name"
          :notify-status="event.notifyStatus"
          :start-date="event.startDate"
        />
      </div>
    </template>
  </UICollapsible>
</template>
