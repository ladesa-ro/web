<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const lesson = inject<ILesson>("lesson")!

</script>
<template>
  <p>Ambiente: {{ lesson.environment }}</p>
</template>