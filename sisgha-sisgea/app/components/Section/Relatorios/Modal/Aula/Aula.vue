<script setup lang="ts">
import RelatorioAulaLinha from './Line/Line.vue'

defineProps<{
  titulo: string
  subtitulo: string
  aulas: { data: string; horario: string }[]
}>()
</script>

<template>
  <div class="aula mb-5">
    <div class="aula-header bg-ldsa-green-1 text-ldsa-white border-2 border-ldsa-grey rounded-t-lg p-[1.06rem] gap-1">
      <h6 class="title font-semibold text-[11px]">{{ titulo }}</h6>
      <p class="quantidade text-[10px] text-ldsa-white-1/25">{{ subtitulo }}</p>
    </div>

    <div class="aula-content">
      <RelatorioAulaLinha
        v-for="(item, index) in aulas"
        :key="index"
        :data="item.data"
        :horario="item.horario"
      />
    </div>

    <div
      class="aula-more bg-ldsa-white-1/25 flex items-center justify-center border-ldsa-grey border-x-2 border-b-2 rounded-b-lg p-[0.4rem] cursor-pointer"
    >
      <p class="text-medium text-[11px]">Ver Mais +</p>
    </div>
  </div>
</template>
