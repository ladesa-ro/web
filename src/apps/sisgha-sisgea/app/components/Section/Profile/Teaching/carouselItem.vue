<script lang="ts" setup>
import type {
  CursoFindOneOutputDto,
  DisciplinaFindOneOutputDto,
  TurmaFindOneOutputDto,
} from '@ladesa-ro/web.api.client';

type DisciplinaCursoTurma = {
  disciplina: DisciplinaFindOneOutputDto;
  cursos: Array<{
    curso: CursoFindOneOutputDto;
    turmas: Array<{ turma: TurmaFindOneOutputDto }>;
  }>;
};

type Props = { subject: DisciplinaCursoTurma };
const { subject } = defineProps<Props>();

//

type CourseOption = {
  value: DisciplinaCursoTurma['cursos'][number];
  label: string;
};

const coursesCarousel: CourseOption[] = subject.cursos.map(curso => ({
  value: curso,
  label: curso.curso.nomeAbreviado,
}));

const selectedCourse = ref<CourseOption>(coursesCarousel[0]!);

const selectedCourseTurmas = computed(() => {
  // if the type is CourseOption, get sel.value, otherwise assume that the desired value is already in the variable itself, without any internal item

  // this code snippet is to handle an unexpected error coming from v-model, even though i didn't understand it very well

  const sel = selectedCourse.value;
  const item = sel?.value ?? sel;

  if (!item) return [];

  return item.turmas.map(turma => turma.turma.periodo);
});

const { data: disciplinaImageUrl } = useDisciplinas().imageCover(computed(() => subject.disciplina?.id ?? null));
</script>

<template>
  <div class="border-card u-mb-3 u-text-left u-font-semibold">
    <img
      v-if="disciplinaImageUrl"
      alt="Capa da disciplina."
      class="carousel-item__cover u-w-full"
      :src="disciplinaImageUrl ?? undefined"
    />

    <div v-else class="carousel-item__cover carousel-item__cover--placeholder u-w-full" />

    <!-- card body -->
    <main class="u-p-4">
      <h1>{{ subject.disciplina.nomeAbreviado }}</h1>

      <div class="course-and-classes border-card u-rounded-lg u-mt-3 u-py-3 u-text-sm">
        <!-- navigation -->
        <UIOptionsCarousel
          v-model="selectedCourse"
          class="carousel-item__carousel-nav u-pb-2 u-mb-2"
          :items="coursesCarousel"
        >
          <template #toggleButton>
            <IconsArrow class="carousel-item__toggle-icon" />
          </template>
        </UIOptionsCarousel>

        <span class="u-font-medium">{{
          selectedCourseTurmas ? selectedCourseTurmas.join(', ') : ''
        }}</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.icon {
  max-height: 0.75rem;
  color: var(--ladesa-text-green-color);
}

.carousel-item__cover {
  min-height: 2.375rem;
  max-height: 3.5rem;
}

.carousel-item__cover--placeholder {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 50%);
}

.course-and-classes {
  padding-inline: var(--ui-space-3);
}

@media (min-width: 64rem) {
  .course-and-classes {
    padding-inline: var(--ui-space-4);
  }
}

.carousel-item__carousel-nav {
  border-bottom: 2px solid var(--ladesa-grey-color);
}

.carousel-item__toggle-icon {
  color: var(--ladesa-text-green-color);
}
</style>
