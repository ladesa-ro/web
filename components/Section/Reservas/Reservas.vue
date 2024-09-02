<script setup lang="ts">
// import type { ILesson } from '~/components/Section/Horario/-Helpers/ILesson';

// o componente UIGenericLesson será chamado e tentarei levar a lógica de estilização de acordo com horário para lá.
</script>

<template>
  <div
    class="flex flex-1 overflow-auto flex-col items-center gap-12 pb-14 xl:max-w-screen-2xl xl:mx-auto max-xl:mx-16 max-[900px]:text-sm max-[850px]:mx-7"
  >
    <div class="max-w-screen-lg w-full mx-auto mt-14">
      <UISearchBar id="size" />
    </div>

    <div class="max-w-screen-lg w-full mx-auto">
      <SectionHorarioDailyViewDaySquareList />

      
      <div class="flex flex-col gap-5 mt-12">
        <!-- este é apenas um código de exemplo. ele será alterado. -->
        <UIGenericRectangle>
          <template #title>
            Nome do ambiente
          </template>
          <template #content>
            <p>Horário: </p>
            <p>Autor da reserva: </p>
          </template>
        </UIGenericRectangle>
        <!-- <SectionHorarioDailyViewLesson
          v-for="(lesson, index) in lessons"
          :lesson="lesson"
          :variant="getVariantForIndex(index)"
        /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
#size {
  max-width: none;
}
</style>
