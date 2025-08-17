<script setup lang="ts">
const getRoutePath = () => {
  const router = useRouter();
  const route = useRoute();

  if (route.path === '/sisgha/consulta') {
    router.push('/')
    clearSelectedItems();
  }
  else if (route.path === '/sisgha/consulta/horario') {
    router.push('/sisgha/consulta')
  }

  
}

// TODO: deixar o nome do horário selecionado dinâmico
</script>

<template>
  <header
    class="flex justify-between px-0.5 min[350px]-px-1.5 sm:px-3 lg:px-7 bg-ldsa-green-1 text-ldsa-white font-semibold border-b border-b-ldsa-green-2 h-16 z-100 max-w-full"
  >
    <button @pointerdown="getRoutePath" class="flex items-center p-2 shrink-0">
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
          <span class="ml-10">
            1° Período Tecnólogo em Análise e Desenvolvimento de Sistemas - 2023
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
