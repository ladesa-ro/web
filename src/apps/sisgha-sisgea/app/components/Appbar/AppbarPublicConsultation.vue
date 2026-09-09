<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { turmaFindById } from '@ladesa-ro/web.api.client';

const route = useRoute();

const turmaId = computed(() => route.params.id ?? null);

const api = useApiClient();

const isQueryEnabled = computed(
  () => turmaId.value !== null && route.params.id !== undefined
);

const { isLoading, isError, data } = useQuery({
  queryKey: ['turma', 'turma::id', turmaId],
  queryFn: async () =>
    await api.call(turmaFindById, {
      path: { id: turmaId.value as string },
    }),
  enabled: isQueryEnabled,
});

const goBackRoute = () => {
  const router = useRouter();

  if (route.path === '/sisgha/consulta') {
    router.push('/');
  } else if (turmaId.value) {
    router.push('/sisgha/consulta');
  }
};
</script>

<template>
  <header class="u-flex u-justify-between consultation-header">
    <button
      class="u-flex u-items-center u-p-2 u-shrink-0"
      @pointerdown="goBackRoute"
    >
      <IconsArrowAlt class="u-p-1-5 u-mr-1 consultation-back-icon" />
      <span class="consultation-back-label"> Voltar </span>
    </button>

    <span
      class="u-flex u-items-center u-overflow-hidden consultation-title-group"
    >
      <div
        class="u-overflow-hidden u-relative u-flex u-items-center u-h-full consultation-marquee"
      >
        <div class="consultation-marquee-inner text-animation">
          <span v-if="turmaId" class="u-ml-10">
            <span v-if="isLoading"> Carregando... </span>

            <span v-else-if="isError"> Ocorreu um erro inesperado. </span>

            <span v-else-if="data">
              {{ data.periodo }} -
              {{ data.curso.nomeAbreviado }}
            </span>
          </span>
        </div>
      </div>
      <AppbarChangeTheme class="u-shrink-0" />
    </span>
  </header>
</template>

<style scoped>
.consultation-header {
  padding-inline: 0.125rem;
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  font-weight: var(--ui-font-weight-semibold);
  border-bottom: 1px solid var(--ladesa-green-2-color);
  height: 4rem;
  z-index: 100;
  max-width: 100%;
}

@media (min-width: 350px) {
  .consultation-header {
    padding-inline: 0.375rem;
  }
}

@media (min-width: 640px) {
  .consultation-header {
    padding-inline: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .consultation-header {
    padding-inline: 1.75rem;
  }
}

.consultation-back-icon {
  width: 1.875rem;
}

.consultation-back-label {
  display: inline;
}

@media (max-width: 767px) {
  .consultation-back-label {
    display: none;
  }
}

.consultation-title-group {
  flex-shrink: 1;
}

@media (min-width: 640px) {
  .consultation-title-group {
    gap: 0.75rem;
  }
}

@media (min-width: 768px) {
  .consultation-title-group {
    max-width: 75%;
  }
}

.consultation-marquee {
  white-space: nowrap;
}

.consultation-marquee-inner {
  display: inline-block;
}

@media (max-width: 639px) {
  .consultation-marquee-inner {
    padding-left: 100%;
  }
}

@media (min-width: 640px) {
  .consultation-marquee-inner {
    animation: none !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.text-animation {
  animation: scroll-text 8s linear infinite;
}

div:hover > .text-animation {
  animation-play-state: paused;
}

@keyframes scroll-text {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
