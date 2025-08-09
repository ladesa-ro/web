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

//

const open = ref(false);
</script>

<template>
  <UICollapsible class="border-2 border-ldsa-grey rounded-lg" v-model="open">
    <template #trigger>
      <div class="flex justify-between items-center w-full p-5">
        <!-- Title -->
        <p class="font-medium text-sm sm:text-base no-underline inline-block">
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

        <IconsArrow
          :class="open ? 'rotate-90' : '-rotate-90'"
          class="text-ldsa-text-green transition-[rotate]"
        />
      </div>
    </template>

    <div class="flex flex-col gap-2 w-full max-h-74 overflow-auto xl:pr-0">
      <p class="m-5 mt-0 text-ldsa-grey" v-if="allEventItems.length === 0">
        Nenhum evento encontrado.
      </p>

      <SectionCalendarioEventsEvent
        class="m-5 mt-0 not-last:mb-0"
        v-else
        v-for="event in allEventItems"
        :key="event.id"
        v-bind="event"
      />
    </div>
  </UICollapsible>
</template>
