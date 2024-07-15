<script setup lang="ts">
import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';
import { verifyClassStatusByLesson } from './-Utils';
import LessonInfoEnvironment from './LessonInfoEnvironment.vue';

type Props = {
  lesson: ILesson;
  viewFor?: 'teacher' | 'student';
};

const props = defineProps<Props>();
const { lesson } = toRefs(props);

provide('lesson', lesson);

const variant = verifyClassStatusByLesson(lesson.value);
</script>

<template>
  <div
    class="flex flex-row items-center justify-between border-2 border-[#118D3B] rounded-lg min-[641px]:px-5 min-[641px]:py-3 max-sm:px-4 max-sm:py-2"
    :class="{ completed: variant === 'completed' }"
  >
    <section class="flex flex-col justify-between">
      <slot>
        <SectionHorarioDailyViewLessonTeacherView
          v-if="viewFor === 'teacher'"
        />

        <SectionHorarioDailyViewLessonStudentView
          v-if="viewFor === 'student'"
        />

        <LessonInfoEnvironment />
        <!--ambiente-->

        <SectionHorarioDailyViewLessonInfoTime />
        <!--horário-->
      </slot>
    </section>

    <IconsIconClock v-if="variant === 'active'" class="icon max-w-8" />
  </div>
</template>

<style scoped>
.completed {
  border-color: #9ab69e;
  color: #9ab69e;
}
</style>
