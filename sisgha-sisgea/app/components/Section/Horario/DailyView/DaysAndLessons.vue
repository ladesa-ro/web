<script lang="ts" setup>
import { useApiContext } from '~/components/API/Context/setup-context';
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

const classTimings = [
  { startsAt: '08:20:00', endsAt: '09:09:59' },
  { startsAt: '09:10:00', endsAt: '09:59:59' },
  { startsAt: '19:00:00', endsAt: '19:49:59' },
  { startsAt: '19:50:00', endsAt: '20:39:59' },
  { startsAt: '20:40:00', endsAt: '21:29:59' },
];

const getTimeForIndex = (index: number) => {
  return classTimings[index]!;
};

const generatedLessons = Array.from({ length: classTimings.length }).map(
  (_, index): ILesson => {
    const { startsAt, endsAt } = getTimeForIndex(index);

    return {
      discipline: 'Linguagem de Programação',
      class: '2° A Informática',
      environment: 'Sala 20',
      campus: 'IFRO - Campus Ji-Paraná',
      teacher: 'Danilo Escudero',
      startsAt,
      endsAt,
    };
  }
);

const { resumoVinculos } = useApiContext();

const viewFor = computed(() => {
  if (resumoVinculos.value.cargos.includes('professor'))
    return 'teacher';
  
  return 'student';
});
</script>

<template>
  <div class="max-w-screen-lg w-full">
    <SectionHorarioDailyViewDaySquareList />

    <div class="flex flex-col gap-5 mt-8 lg:mt-12">
      <SectionHorarioDailyViewLesson
        v-for="lesson in generatedLessons"
        :lesson="lesson"
        :view-for="viewFor"
      />
    </div>
  </div>
</template>
