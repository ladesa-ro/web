<script lang="ts" setup>
import { useApiContext } from '~/composables/api-context/setup';
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
    <section class="u-flex u-flex-col u-justify-between">
      <slot>
        <SectionHorarioProfessorEAlunoDailyViewLessonTeacherView
          v-if="viewFor === 'teacher'"
        />

        <SectionHorarioProfessorEAlunoDailyViewLessonStudentView
          v-else-if="viewFor === 'student'"
        />

        <!--ambiente-->
        <LessonInfoEnvironment :show-campus="showCampus" />

        <!--horário-->
        <SectionHorarioProfessorEAlunoDailyViewLessonInfoTime />
      </slot>
    </section>

    <IconsClock v-if="variant === 'active'" class="icon u-shrink-0" />
  </div>
</template>

<style scoped>
.lesson {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid var(--ladesa-green-1-color);
  border-radius: var(--ui-radius-lg);
  padding-inline: var(--ui-space-4);
  padding-block: var(--ui-space-2);
  font-size: 0.875rem;
}

@media (max-width: 767.98px) {
  .lesson {
    gap: var(--ui-space-2-5);
  }
}

@media (min-width: 640px) {
  .lesson {
    padding-inline: var(--ui-space-5);
    padding-block: var(--ui-space-3);
  }
}

@media (min-width: 1024px) {
  .lesson {
    font-size: 1rem;
  }
}

.icon {
  max-width: 1.375rem;
  color: var(--ladesa-text-green-color);
}

@media (min-width: 1024px) {
  .icon {
    max-width: 1.75rem;
  }
}

.completed {
  border-color: rgb(from var(--ladesa-grey-color) R G B / 75%);
  color: var(--ladesa-grey-color);
  font-weight: var(--ui-font-weight-regular);
}
</style>
