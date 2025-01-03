<script setup>
const subjects = [
  'Matemática',
  'Biologia',
  'Banco de Dados I',
  'História II',
  'Instação e Manutenção de Computadores',
];
</script>

<template>
  <SectionProfileCard>
    <template #icon>
      <IconsIconDiscipline />
    </template>

    <template #title>Ensino</template>

    <!-- teaching cards carousel -->
    <Carousel snap-align="start" :items-to-show="2.5" :wrap-around="true">
      <Slide v-for="subject in subjects" :key="subject">
        <SectionProfileTeachingCarouselItem :subject-name="subject" />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </SectionProfileCard>
</template>

<style>
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
