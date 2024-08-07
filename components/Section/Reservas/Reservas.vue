<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const genericLesson: ILesson = {
  teacher: 'Danilo',
  discipline: 'Linguagem de Programação',
  class: '2° A Informática',
  environment: 'Sala 20',
  campus: 'IFRO - Campus Ji-Paraná',
  startsAt: '13:50',
  endsAt: '14:40',
};

const lessons: ILesson[] = [
  genericLesson, // 0 < 2 --- completed
  genericLesson, // 1 < 2 --- completed
  genericLesson, // 2 == 2 -- active
  genericLesson, // 3 > 2 --- default
  genericLesson, // 4 > 2 --- default
];

const activeIndex = 2;

function getVariantForIndex(index: number) {
  if (index < activeIndex) {
    return 'completed';
  }

  if (index === activeIndex) {
    return 'active';
  }

  return;
}
</script>

<template>
  <div
    class="flex flex-1 overflow-auto flex-col items-center gap-12 pb-14 xl:max-w-screen-2xl xl:mx-auto max-xl:mx-16 max-[900px]:text-sm max-[850px]:mx-7"
  >
    <div class="max-w-screen-lg w-full mx-auto mt-14">
      <UISearchBar id="size" />
    </div>

    <div class="max-w-screen-lg w-full mx-auto">
      <SectionHorarioDailyViewDaySquareList />

      <div class="flex flex-col gap-5 mt-12">
        <SectionHorarioDailyViewLesson
          v-for="(lesson, index) in lessons"
          :lesson="lesson"
          :variant="getVariantForIndex(index)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#size {
  max-width: none;
}
</style>
