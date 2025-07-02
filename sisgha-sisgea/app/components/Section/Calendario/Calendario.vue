<script lang="ts" setup>
import 'dayjs/locale/pt-br';
import { ghostCalendar } from './GhostCalendar';
</script>

<template>
  <UIContainer>
    <SectionCalendarioViewsType1
      :calendar-id="ghostCalendar!.id"
      :year="ghostCalendar!.ano"
    />
  </UIContainer>
</template>
