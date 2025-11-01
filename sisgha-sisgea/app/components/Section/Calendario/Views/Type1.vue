<script lang="ts" setup>
import { SectionCalendarioEvent, SectionCalendarioMonth } from '#components';
import { computed } from 'vue';
import type { CalendarData } from '../Types';
import { useCalendarEvents } from '../useCalendarEvent';

type Props = {
  calendarData: CalendarData;
};

const props = defineProps<Props>();

// Cria um Ref reativo para passar no composable
const calendarId = computed(() => props.calendarData.id);

// Obtém os eventos dinamicamente
const { events, reload } = useCalendarEvents(calendarId);
</script>

<template>
  <div
    class="flex flex-col md:flex-row w-full h-max justify-center gap-4 md:gap-8"
  >
    <!-- Mês -->
    <SectionCalendarioMonth
      :calendar-id="props.calendarData.id"
      :toggle-month="true"
      :year="props.calendarData.year || 0"
      :events="events"
      class="flex-shrink-0 w-full sm:w-[30.6rem] md:w-[20rem] lg:w-[28rem]"
    />

    <!-- Lista de eventos -->
    <div class="flex flex-col gap-4 md:gap-6 w-full">
      <SectionCalendarioEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
        :calendarId="props.calendarData.id"
        @refresh="reload"
        class="p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
      />
    </div>
  </div>
</template>

<style scoped>
/* Se quiser, pode adicionar estilos específicos aqui */
</style>
