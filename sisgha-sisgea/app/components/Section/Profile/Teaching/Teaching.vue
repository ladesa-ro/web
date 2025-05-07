<script setup>
import IconDiscipline from '~/components/Icons/IconDiscipline.vue';

const config = {
  wrapAround: true,
  snapAlign: 'start',
  breakpointMode: 'viewport',
  breakpoints: {
    100: { itemsToShow: 1 },
    770: { itemsToShow: 2 },
    900: { itemsToShow: 1 },
    1000: { itemsToShow: 2 },
    1100: { itemsToShow: 2.5 },
  },
};

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
    <Carousel v-bind="config">
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
@reference "~/assets/styles/app-reference.css";

/* TODO: encontrar outra lib para carrossel, se possível */
@import 'vue3-carousel/dist/carousel.css';

/* :root {
  --vc-pgn-margin: 30px 8px 0 0 !important;
} */

.carousel__slide {
  @apply pb-4 px-1 md:px-2 lg:px-2.5;
}

.carousel__prev {
  @apply -ml-5;
}

.carousel__next {
  @apply -mr-5;
}
</style>
