<script setup>
import IconDiscipline from '~/components/Icons/IconDiscipline.vue';

const subjects = [
  'Matemática',
  'Biologia',
  'Banco de Dados I',
  'História II',
  'Filosofia',
];
</script>

<template>
  <SectionProfileSectionsLayout :icon="IconDiscipline" title="Ensino">
    <!-- teaching cards carousel -->
    <Carousel :items-to-show="2.5" :wrap-around="true" snap-align="start">
      <Slide v-for="subject in subjects" :key="subject">
        <SectionProfileTeachingCarouselItem :subject-name="subject" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </SectionProfileSectionsLayout>
</template>

<style>
@reference "~/assets/styles/app.css";

/* TODO: encontrar outra lib para carrossel, se possível */
@import 'vue3-carousel/dist/carousel.css';

:root {
  --vc-pgn-margin: 30px 8px 0 0 !important;
}

.carousel__slide {
  @apply p-2.5;
}

.carousel__prev {
  @apply -ml-5;
}

.carousel__next {
  @apply -mr-5;
}
</style>
