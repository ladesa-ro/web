<script setup lang="ts">
type Props = {
  subjectName: string;
};
defineProps<Props>();

const classes = ['1°A', '1°B', '2°A', '2°B', '3°A', '3°B'];

const courses = [
  'Técnico em Informática',
  'Técnico em Química',
  'Técnico em Florestas',
  'A.D.S',
  'Licenciatura em Química',
  'Engenharia Florestal',
];

let selectedCourseIndex = ref(0);

function goAhead(advance: boolean) {
  if (advance) {
    if (selectedCourseIndex.value < 5) selectedCourseIndex.value++;
    else selectedCourseIndex.value = 0;
  } else {
    if (selectedCourseIndex.value === 0) selectedCourseIndex.value = 5;
    else selectedCourseIndex.value--;
  }
}
</script>

<template>
  <div class="card-style border-card">
    <img
      alt="Capa do curso."
      class="image w-full max-h-14"
      src="@/imgs/Foto-Curso.png"
    />

    <!-- card body -->
    <main class="p-4">
      <h1>{{ subjectName }}</h1> <!--min-h-[3rem]-->

      <div class="course-and-classes border-card">
        <!-- navigation -->
        <section class="navigation-course">
          <IconsArrowIconArrow class="icon" @click="goAhead(false)" />
          
          {{ courses[selectedCourseIndex] }}

          <IconsArrowIconArrow class="icon rotate-180" @click="goAhead(true)" />
        </section>

        <!-- classes list -->
        <span class="font-medium">{{ classes.join(', ') }}</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.card-style {
  @apply mb-5 text-left font-semibold;
}

.icon {
  @apply cursor-pointer text-ldsa-text-green max-h-3;
}

.course-and-classes {
  @apply rounded-lg mt-3 py-3 px-5 text-sm;
}

.navigation-course {
  @apply flex justify-between items-center;
  @apply pb-2 mb-2 border-b-2 border-b-ldsa-grey;
}
</style>
