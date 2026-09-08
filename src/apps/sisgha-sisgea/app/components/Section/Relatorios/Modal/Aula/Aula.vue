<script setup lang="ts">
import RelatorioAulaLinha from './Line/Line.vue';

defineProps<{
  titulo: string;
  subtitulo: string;
  aulas: { data: string; horario: string }[];
}>();

const aulasExibidas = ref(4);

const carregarMais = () => {
  aulasExibidas.value += 2;
};
</script>

<template>
  <div class="aula u-mb-5">
    <div class="aula-header u-gap-1">
      <h6 class="title u-font-semibold">{{ titulo }}</h6>
      <p class="quantidade">{{ subtitulo }}</p>
    </div>

    <div class="aula-content">
      <RelatorioAulaLinha
        v-for="item in aulas.slice(0, aulasExibidas)"
        :key="`${item.data}-${item.horario}`"
        :data="item.data"
        :horario="item.horario"
      />
    </div>

    <div
      v-if="aulasExibidas < aulas.length"
      class="aula-more u-flex u-items-center u-justify-center"
      @click="carregarMais"
    >
      <p class="text-medium">Ver Mais +</p>
    </div>
  </div>
</template>

<style scoped>
.aula-header {
  padding: 1.06rem;
  border: 2px solid var(--ladesa-grey-color);
  border-top-left-radius: var(--ui-radius-lg);
  border-top-right-radius: var(--ui-radius-lg);
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.title {
  font-size: 0.6875rem;
}

.quantidade {
  font-size: 0.625rem;
  color: rgb(from var(--ladesa-white-color) R G B / 25%);
}

.aula-more {
  padding: 0.4rem;
  cursor: pointer;
  border-left: 2px solid var(--ladesa-grey-color);
  border-right: 2px solid var(--ladesa-grey-color);
  border-bottom: 2px solid var(--ladesa-grey-color);
  border-bottom-left-radius: var(--ui-radius-lg);
  border-bottom-right-radius: var(--ui-radius-lg);
  background-color: rgb(from var(--ladesa-grey-color) R G B / 25%);
}

.aula-more .text-medium {
  font-size: 0.6875rem;
}
</style>
