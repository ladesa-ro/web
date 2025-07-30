<script lang="ts" setup>
// # IMPORT
import {
  SectionCalendarioForm,
  UIButtonSearch,
  VVAutocompleteAPIOfertaFormacao,
} from '#components';
import IconCompleteCalendar from '@/components/Icons/Calendar/IconCompleteCalendar.vue';
import IconPartialCalendar from '@/components/Icons/Calendar/IconPartialCalendar.vue';
import { ghostCalendar } from './GhostCalendar';

// # CODE
let toggleView = ref<number>(0);

const toggleItems = [
  { text: 'Calendário parcial', value: 0, icon: IconPartialCalendar },
  { text: 'Calendário completo', value: 1, icon: IconCompleteCalendar },
];
</script>

<template>
  <UIContainer>
    <!-- Menu -->
    <div class="flex w-full items-center gap-2 mb-4">
      <VVAutocompleteAPIOfertaFormacao name="ofertaFormacao" />
      <DialogModalEditOrCreateModal :form-component="SectionCalendarioForm" />
      <UIButtonSearch />
    </div>

    <!-- Content -->
    <UIToggle :items="toggleItems" v-model="toggleView" />
    <SectionCalendarioViewsType1
      v-show="toggleView === 0"
      :calendar-id="ghostCalendar!.id"
      :year="ghostCalendar!.ano"
    />
    <SectionCalendarioViewsType2
      v-show="toggleView === 1"
      :calendar-id="ghostCalendar!.id"
      :year="ghostCalendar!.ano"
    />
  </UIContainer>
</template>
