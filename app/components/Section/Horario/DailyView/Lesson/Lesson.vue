<script setup lang="ts">
import { useApiContext } from '~~/app/components/API/Context/setup-context';
import type { ILesson } from '~~/app/components/Section/Horario/-Helpers/ILesson';
import { verifyClassStatusByLesson } from './-Utils';
import LessonInfoEnvironment from './LessonInfoEnvironment.vue';

type Props = {
  lesson: ILesson;
  viewFor?: 'teacher' | 'student';
};
const props = defineProps<Props>();
const { lesson } = toRefs(props);
const { viewFor } = toRefs(props);

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
  <div class="lesson" :class="{ completed: variant === 'completed' }">
    <section class="flex flex-col justify-between">
      <slot>
        <SectionHorarioDailyViewLessonTeacherView
          v-if="viewFor === 'teacher'"
        />

        <SectionHorarioDailyViewLessonStudentView
          v-if="viewFor === 'student'"
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
@reference "~/assets/styles/app.css";

.lesson {
  @apply flex items-center justify-between;
  @apply border-2 border-ldsa-green-1 rounded-lg;
  @apply min-[641px]:px-5 min-[641px]:py-3;
  @apply max-sm:px-4 max-sm:py-2;
}
.icon {
  @apply max-w-7 text-ldsa-text-green;
}

/* --- */

.completed {
  @apply border-ldsa-grey/75 text-ldsa-grey font-[400];
}
</style>
