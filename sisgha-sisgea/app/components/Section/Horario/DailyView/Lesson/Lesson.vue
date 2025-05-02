<script lang="ts" setup>
import { useApiContext } from '~/components/API/Context/setup-context';
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';
import { verifyClassStatusByLesson } from './-Utils';
import LessonInfoEnvironment from './LessonInfoEnvironment.vue';

type Props = {
  lesson: ILesson;
  viewFor?: 'teacher' | 'student';
};
const props = defineProps<Props>();
const { lesson, viewFor } = toRefs(props);

provide('lesson', lesson);

const variant = verifyClassStatusByLesson(lesson.value);

// #region logic to show the campus only if the teacher teaches on more than one campus
const { resumoVinculos } = useApiContext();

const campiWhereTeaches = computed(
  () => resumoVinculos.value.mapaCargoCampi.professor ?? []
);

const showCampus = computed(() => {
  return campiWhereTeaches.value.length > 1 && viewFor.value === 'teacher';
});
// #endregion
</script>

<template>
  <div :class="{ completed: variant === 'completed' }" class="lesson">
    <section class="flex flex-col justify-between">
      <slot>
        <SectionHorarioDailyViewLessonTeacherView
          v-if="viewFor === 'teacher'"
        />

        <SectionHorarioDailyViewLessonStudentView
          v-else-if="viewFor === 'student'"
        />

        <!--ambiente-->
        <LessonInfoEnvironment :show-campus="showCampus" />

        <!--horário-->
        <SectionHorarioDailyViewLessonInfoTime />
      </slot>
    </section>

    <IconsIconClock v-if="variant === 'active'" class="icon" />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.lesson {
  @apply flex items-center justify-between;
  @apply border-2 border-ldsa-green-1 rounded-lg;
  @apply px-4 sm:px-5 py-2 sm:py-3;
  @apply text-sm lg:text-base;
}

.icon {
  @apply max-w-7 shrink-0 text-ldsa-text-green;
}

/* --- */

.completed {
  @apply border-ldsa-grey/75 text-ldsa-grey font-normal;
}
</style>
