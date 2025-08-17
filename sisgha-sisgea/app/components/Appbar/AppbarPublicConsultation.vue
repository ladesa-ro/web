<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const route = useRoute();

const turmaId = computed(() => route.params.id ?? null);

const apiClient = useApiClient();

const isQueryEnabled = computed(
  () => turmaId.value !== null && route.params.id !== undefined
);

const { isLoading, isError, data } = useQuery({
  queryKey: ['turma', 'turma::id', turmaId],
  queryFn: async () =>
    await apiClient.turmas.turmaFindOneById({
      id: turmaId.value as string,
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
  <header
    class="flex justify-between px-0.5 min[350px]-px-1.5 sm:px-3 lg:px-7 bg-ldsa-green-1 text-ldsa-white font-semibold border-b border-b-ldsa-green-2 h-16 z-100 max-w-full"
  >
    <button @pointerdown="goBackRoute" class="flex items-center p-2 shrink-0">
      <IconsArrowAlt class="w-7.5 p-1.5 mr-1" />
      <span class="max-md:hidden"> Voltar </span>
    </button>

    <span
      class="flex items-center sm:gap-3 md:max-w-3/4 shrink overflow-hidden"
    >
      <div
        class="overflow-hidden relative whitespace-nowrap flex items-center h-full"
      >
        <div
          class="inline-block max-md:pl-[100%] text-animation md:animate-none! md:truncate"
        >
          <span v-if="turmaId" class="ml-10">
            <span v-if="isLoading"> Carregando... </span>

            <span v-else-if="isError"> Ocorreu um erro inesperado. </span>

            <span v-else-if="data">
              {{ data.periodo }} -
              {{ data.curso.nomeAbreviado }}
            </span>
          </span>
        </div>
      </div>
      <AppbarChangeTheme class="shrink-0" />
    </span>
  </header>
</template>

<style scoped>
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
