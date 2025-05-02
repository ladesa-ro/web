<script setup lang="ts">
defineProps<{
  titulo: string
  descricao: string
  aulas: { data: string; horario: string }[]
}>()
</script>

<template>
  <div class="aula mb-5">
    <div class="aula-header bg-ldsa-green-1 text-ldsa-white border-2 border-ldsa-grey rounded-t-lg p-[1.06rem] gap-1">
      <h6 class="title font-semibold text-[11px]">{{ titulo }}</h6>
      <p class="quantidade text-[10px] text-ldsa-white-1/25">{{ descricao }}</p>
    </div>

    <div class="aula-content">
      <div
        v-for="(item, index) in aulas"
        :key="index"
        class="line flex justify-between regular text-[11px] p-[0.4rem] border-x-2 border-b-2 border-ldsa-grey"
      >
        <p class="data">{{ item.data }}</p>
        <p class="horario">{{ item.horario }}</p>
      </div>
    </div>

    <div class="aula-more bg-ldsa-white-1/25 flex items-center justify-center border-ldsa-grey border-x-2 border-b-2 rounded-b-lg p-[0.4rem] cursor-pointer">
      <p class="text-medium text-[11px]">Ver Mais +</p>
    </div>
  </div>
</template>
