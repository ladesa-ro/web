<script setup lang="ts">
import dayjs from '~/components/Section/Horario/-Helpers/dayjs';
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<Ref<ILesson>>("lesson")!
const start: dayjs.Dayjs = dayjs(lesson.value.startsAt, 'HH:mm:ss');
const end: dayjs.Dayjs = dayjs(lesson.value.endsAt, 'HH:mm:ss');

</script>
<template>
  <p>Horário: {{ start.format('HH:mm') }} - {{ end.format('HH:mm') }}</p>
</template>