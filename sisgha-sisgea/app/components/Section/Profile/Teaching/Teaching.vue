<script setup lang="ts">
import type { UsuarioFindOneByIdResponse } from '@ladesa-ro/management-service-client';
import { useQuery } from '@tanstack/vue-query';
import IconDiscipline from '~/components/Icons/Discipline.vue';

type Props = { user: UsuarioFindOneByIdResponse };
const { user } = defineProps<Props>();

const { isLoading, isError, data } = useQuery({
  queryKey: ['ensino', user.id],
  queryFn: async () =>
    await useApiClient().usuarios.usuarioEnsinoById({ id: user.id }),
});

onMounted(() => {
  const teste = document.querySelector('.carousel__prev');
});
</script>

<template>
  <SectionProfileSectionsLayout :icon="IconDiscipline" title="Ensino">
    <div class="state-warning" v-if="isLoading">Carregando...</div>

    <div class="state-warning" v-else-if="isError">
      Ocorreu um erro inesperado ao buscar as disciplinas vinculadas a este
      usuário.
    </div>

    <template v-else-if="data">
      <div class="state-warning" v-if="data.disciplinas.length === 0">
        Ainda não há disciplinas vinculadas a este usuário.
      </div>

      <!-- teaching cards carousel -->
      <Carousel
        v-else
        snap-align="start"
        breakpoint-mode="viewport"
        :breakpoints="{
          100: { itemsToShow: 1 },
          770: { itemsToShow: 2 },
          900: { itemsToShow: 1 },
          1144: { itemsToShow: 1.8 },
          1400: { itemsToShow: 2.1 },
          1500: { itemsToShow: 2.5 },
          1750: { itemsToShow: 3 },
        }"
      >
        <Slide
          v-for="subject in data.disciplinas"
          :key="subject.disciplina.id"
        >
          <SectionProfileTeachingCarouselItem :subject />
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </template>
  </SectionProfileSectionsLayout>
</template>

<style>
@reference "~/assets/styles/app.css";

@import 'vue3-carousel/dist/carousel.css';

.carousel__slide {
  @apply pb-4 px-1 md:px-2 lg:px-2.5;
}

.carousel__prev {
  @apply -ml-5;
}

.carousel__next {
  @apply -mr-5;
}

.state-warning {
  @apply w-full h-full flex items-center justify-center pb-15 text-center;
}
</style>
