<script lang="ts" setup>
// # IMPORT
import 'dayjs/locale/pt-br';
import { ghostCalendar } from './GhostCalendar';

// # CODE
let toggleView = true;
</script>

<template>
  <UIContainer>
    <SectionCalendarioViewsType1
      v-show="!toggleView"
      :calendar-id="ghostCalendar!.id"
      :year="ghostCalendar!.ano"
    />
    <SectionCalendarioViewsType2
      v-show="toggleView"
      :calendar-id="ghostCalendar!.id"
      :year="ghostCalendar!.ano"
    />
  </UIContainer>
</template>
