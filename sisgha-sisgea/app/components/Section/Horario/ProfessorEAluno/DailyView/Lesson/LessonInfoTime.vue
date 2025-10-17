<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<Ref<ILesson>>('lesson')!;

const dayjs = useDayJs();

const start: Dayjs = dayjs(lesson.value.startsAt, 'HH:mm:ss');
const end: Dayjs = dayjs(lesson.value.endsAt, 'HH:mm:ss');
</script>
<template>
  <p>Horário: {{ start.format('HH:mm') }} - {{ end.format('HH:mm') }}</p>
</template>
