<script lang="ts" setup>
import type { CalendarioLetivoDiaFindOneOutputDto } from '@ladesa-ro/web.api.client';
import type { CalendarEvent } from '@ladesa-ro/web.ui';
import DiaListItem from './DiaListItem.vue';

type Dia = CalendarioLetivoDiaFindOneOutputDto;

defineProps<{
  monthName: string;
  monthNum: number;
  dias: Dia[];
  calendarYear: number;
  calendarEvents: CalendarEvent[];
  calendarId: string;
}>();

defineEmits<{ edit: [dia: Dia] }>();
</script>

<template>
  <div
    class="dias-nao-letivos__month-header u-flex u-items-center u-pl-1 u-mb-4"
  >
    <span class="dias-nao-letivos__month-header-text u-font-semibold">
      {{ monthName }}
    </span>
  </div>

  <div class="dias-nao-letivos__responsive-row u-flex u-flex-col u-gap-4">
    <div class="dias-nao-letivos__month-col-year u-shrink-0">
      <SectionCalendarioMonth
        :year="calendarYear"
        :events="calendarEvents"
        :toggle-month="false"
        :calendar-id="calendarId"
        :month-num="monthNum"
      />
    </div>

    <div class="u-flex-1 u-flex u-flex-col">
      <DiaListItem
        v-for="dia in dias"
        :key="dia.id"
        :dia="dia"
        @edit="$emit('edit', dia)"
      />
    </div>
  </div>
</template>

<style scoped>
.dias-nao-letivos__month-header {
  height: 13px;
  border-left: 3px solid var(--ladesa-green-1-color);
}

.dias-nao-letivos__month-header-text {
  font-size: 13px;
  letter-spacing: 0.025em;
  color: var(--ladesa-text-default-color);
}

.dias-nao-letivos__month-col-year {
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .dias-nao-letivos__responsive-row {
    flex-direction: row;
  }

  .dias-nao-letivos__month-col-year {
    width: 300px;
  }
}
</style>
