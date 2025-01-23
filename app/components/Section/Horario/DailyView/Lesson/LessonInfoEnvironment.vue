<script setup lang="ts">
import type { ILesson } from '~~/app/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<ILesson>('lesson')!;

type Props = {
  showCampus?: boolean;
};

defineProps<Props>();
</script>
<template>
  <p>
    Ambiente: {{ lesson.environment }}
    <span v-if="showCampus">, {{ lesson.campus }}</span>
  </p>
</template>
