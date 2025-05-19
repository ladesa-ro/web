<script lang="ts" setup>
type Props = { subjectName: string };
defineProps<Props>();

//

const classes = ['1°A', '1°B', '2°A', '2°B', '3°A', '3°B'];

const courses = [
  'Técnico em Informática',
  'Técnico em Química',
  'Técnico em Florestas',
  'A.D.S',
  'Licenciatura em Química',
  'Engenharia Florestal',
];

const selectedCouse = ref(courses[0]);
</script>

<template>
  <div class="card-style border-card">
    <img
      alt="Capa do curso."
      class="image w-full max-h-14"
      src="@/assets/imgs/Foto-Curso.png"
    />

    <!-- card body -->
    <main class="p-4">
      <h1>{{ subjectName }}</h1>

      <div class="course-and-classes border-card">
        <!-- navigation -->
        <UIOptionsCarousel
          class="pb-2 mb-2 border-b-2 border-b-ldsa-grey"
          :items="courses"
          v-model="selectedCouse"
        >
          <template #toggleButton>
            <IconsArrowIconArrow class="text-ldsa-text-green" />
          </template>
        </UIOptionsCarousel>

        <!-- classes list -->
        <span class="font-medium">{{ classes.join(', ') }}</span>
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
