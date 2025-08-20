<script lang="ts" setup>
import type {
  Ladesa_ManagementService_Domain_Contracts_CursoFindOneOutput as Curso,
  Ladesa_ManagementService_Domain_Contracts_DisciplinaFindOneOutput as Disciplina,
  Ladesa_ManagementService_Domain_Contracts_TurmaFindOneOutput as Turma,
} from '@ladesa-ro/management-service-client';

type DisciplinaCursoTurma = {
  disciplina: Disciplina;
  cursos: Array<{
    curso: Curso;
    turmas: Array<{ turma: Turma }>;
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

const disciplinaImageUrl = useApiImageRoute(
  ApiImageResource.DISCIPLINA_COVER,
  subject.disciplina
);
</script>

<template>
  <div class="card-style border-card">
    <img
      v-if="disciplinaImageUrl"
      alt="Capa da disciplina."
      class="image w-full min-h-9.5 max-h-14"
      :src="disciplinaImageUrl ?? undefined"
    />

    <div v-else class="bg-ldsa-grey/30 w-full min-h-9.5 max-h-14"></div>

    <!-- card body -->
    <main class="p-4">
      <h1>{{ subject.disciplina.nomeAbreviado }}</h1>

      <div class="course-and-classes border-card">
        <!-- navigation -->
        <UIOptionsCarousel
          class="pb-2 mb-2 border-b-2 border-b-ldsa-grey"
          :items="coursesCarousel"
          v-model="selectedCourse"
        >
          <template #toggleButton>
            <IconsArrow class="text-ldsa-text-green" />
          </template>
        </UIOptionsCarousel>

        <span class="font-medium">{{
          selectedCourseTurmas ? selectedCourseTurmas.join(', ') : ''
        }}</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.card-style {
  @apply mb-3 text-left font-semibold;
}

.icon {
  @apply max-h-3 text-ldsa-text-green;
}

.course-and-classes {
  @apply rounded-lg mt-3 py-3 px-3 lg:px-4 text-sm;
}
</style>
