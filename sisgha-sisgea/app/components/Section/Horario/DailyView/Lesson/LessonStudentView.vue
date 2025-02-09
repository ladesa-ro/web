<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<ILesson>('lesson')!;
</script>
<template>
  <h1 class="font-[600]">{{ lesson.discipline }} - {{ lesson.teacher }}</h1>
</template>
