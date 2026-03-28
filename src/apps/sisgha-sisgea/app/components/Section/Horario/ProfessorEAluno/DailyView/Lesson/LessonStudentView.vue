<script lang="ts" setup>
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<ILesson>('lesson')!;
</script>
<template>
  <h1 class="font-semibold">{{ lesson.discipline }} - {{ lesson.teacher }}</h1>
</template>
