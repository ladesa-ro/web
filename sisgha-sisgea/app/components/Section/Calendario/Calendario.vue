<script lang="ts" setup>
// # IMPORT
import { SectionCalendarioForm, UIButtonSearch } from '#components';
import IconCompleteCalendar from '@/components/Icons/Calendar/CompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/PartialCalendar.vue';
import dayjs from 'dayjs';
import { calendarDataMethods } from './CalendarDataMethods';
import type { CalendarData } from './Types';

import { useCampusDoUsuario } from '../../../composables/integrations/ladesa-api/modules/useCampusUsuario';
import { useApiContext } from '../../API/Context/setup-context';

// # CODE
let toggleView = ref<number>(0);

const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];

// TODO: Fix 'Get Calendar' Feature
const { usuario } = useApiContext();
const { campus } = useCampusDoUsuario(usuario.value.id, true);

let selectedCalendar = ref<CalendarData>(
  await calendarDataMethods.calendar.getCalendarById('', campus.value!)
);
let selectedTrainingOffer = ref<any | null>(null);
let selectedYear = ref<number>(dayjs().year());

async function toggleSelectedCalendarItem(value: string) {
  selectedCalendar.value = await calendarDataMethods.calendar.getCalendarById(
    value,
    campus.value!
  );
}
</script>

<template>
  <UIContainer>
    <!-- Menu -->
    <div class="flex w-full justify-between items-center gap-2 mb-4">
      <div class="flex gap-2">
        <div class="flex max-w-[17%] min-w-[17%]">
          <VVTextField
            v-model="selectedYear"
            name="calendarYear"
            type="number"
            label="Ano Letivo"
            placeholder="Digite aqui"
          />
        </div>
        <VVAutocompleteAPIOfertaFormacao
          name="trainingOffer"
          label="Formação"
        />
        <VVAutocompleteAPICalendarioLetivo
          name="selectedCalendar"
          @update:model-value="toggleSelectedCalendarItem"
        />
      </div>

      <div class="flex gap-2">
        <DialogModalEditOrCreateModal
          :form-component="SectionCalendarioForm"
          :form-props="{ calendarId: selectedCalendar.id }"
        />
        <UIButtonSearch />
      </div>
    </div>

    <!-- Content -->
    <div
      :key="selectedCalendar.id"
      class="flex flex-col w-full justify-between items-center gap-2"
      v-show="selectedCalendar.year === selectedYear"
    >
      <UIToggle :items="toggleItems" v-model="toggleView" class="w-full" />
      <SectionCalendarioViewsType1
        v-show="toggleView === 0"
        :calendar-data="selectedCalendar!"
      />
      <SectionCalendarioViewsType2
        v-show="toggleView === 1"
        :calendar-id="selectedCalendar.id!"
        :year="selectedCalendar.year!"
      />
    </div>
  </UIContainer>
</template>
