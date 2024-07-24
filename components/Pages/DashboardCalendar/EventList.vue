<script lang="ts" setup>
const dayjs = useDayJs();

// Interface and types
type EventData = {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  color: string;
};

type Step = EventData & {
  number: number;
};

type Event = EventData & {
  name: string;
  locale: string;
};

type EventItem = Omit<Event, 'locale' | 'type'> & {
  details: string;
  locale?: string;
};

// Props

type Props = {
  year: number;
  steps: Step[];
  events: Event[];
  monthNum: number;
};

const props = defineProps<Props>();

// Set event data
let allEventItems = ref<EventItem[]>([
  {
    id: '',
    name: '',
    details: '',
    color: '',
    startDate: '',
    endDate: '',
  },
]);

async function setEvents(): Promise<void> {
  try {
    // Push in 'EventItems' array
    async function pushItemInList(
      Id: string,
      Name: string,
      StartDate: string,
      EndDate: string,
      Color: string,
      Locale?: string
    ): Promise<void> {
      try {
        allEventItems.value.push({
          id: Id,
          name: Name,
          details: `Este evento começa dia ${dayjs(
            dayjs(StartDate).toDate()
          ).format('DD/MM')} e termina em ${dayjs(
            dayjs(EndDate).toDate()
          ).format('DD/MM')}.`,
          color: Color,
          locale: Locale,
          startDate: StartDate,
          endDate: EndDate,
        });
      } catch (error) {}
    }

    // Set all events
    async function setAllItems(): Promise<boolean> {
      try {
        allEventItems.value = [];

        // Set steps
        for (let i = 0; i < props.steps!.length; i++) {
          await pushItemInList(
            props.steps![i].id,
            `${props.steps![i].number}° Etapa`,
            props.steps![i].startDate,
            props.steps![i].endDate,
            props.steps![i].color
          );
        }

        // Set events
        for (let i = 0; i < props.events!.length; i++) {
          await pushItemInList(
            props.events![i].id,
            props.events![i].name,
            props.events![i].startDate,
            props.events![i].endDate,
            props.events![i].color,
            props.events![i].locale
          );
        }

        return true;
      } catch (error) {
        return false;
      }
    }

    // Order list by date
    async function OrderList(): Promise<void> {
      try {
        // Order
        allEventItems.value = allEventItems.value.slice().sort((a, b) => {
          // Save diff dates
          const date1 = dayjs(a.endDate).diff(dayjs().toDate());
          const date2 = dayjs(b.endDate).diff(dayjs().toDate());
          // Remove before events
          return date1 - date2;
        });

        // Order events by month
        const firstDayOfMonth = dayjs(
          `${props.year!}-${props.monthNum! + 1}-01`
        );

        allEventItems.value = allEventItems.value.filter(
          (event) =>
            (dayjs(event.startDate) >= firstDayOfMonth.startOf('month') ||
              dayjs(event.endDate) >= firstDayOfMonth.startOf('month')) &&
            dayjs(event.startDate) <= firstDayOfMonth.endOf('month')
        );
      } catch (error) {}
    }

    // Calling internal functions
    await setAllItems();
    await OrderList();
  } catch (error) {}
}

onMounted(async () => {
  await setEvents();

  // Watch month for toggle events
  watch(
    () => props.monthNum!,
    async (newValue: number) => {
      if (newValue !== null) {
        await setEvents();
      }
    }
  );
});
</script>

<template>
  <div
    class="-scrollbar flex flex-col gap-2 overflow-y-auto w-[464px] h-[568px] pr-2 xl:pr-0"
  >
    <PagesDashboardCalendarEvent
      v-for="(event, index) in allEventItems"
      :id="event.id"
      :key="event.id"
      :name="event.name"
      :details="event.details"
      :locale="event.locale"
      :color="event.color"
    />
  </div>
</template>

<style scoped></style>
