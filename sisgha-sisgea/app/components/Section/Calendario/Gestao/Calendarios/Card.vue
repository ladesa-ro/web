<template>
  <NuxtLink
    :to="'./'"
    class="p-5 rounded-lg border-2 border-ldsa-grey flex flex-col gap-3.5 hover:bg-ldsa-grey/10"
  >
    <div class="flex-1 flex justify-between items-center">
      <h1 class="font-medium text-lg">Campus Party 2026</h1>

      <UIButtonEdit />
    </div>

    <div class="flex flex-col gap-1 text-sm">
      <span> Formação: Técnico Integrado </span>
      <span> Duração: 7 jun 2026 - 8 ago 2026 </span>
    </div>

    <div class="flex flex-col gap-1.5 text-sm">
      <div class="flex gap-2 items-center text-ldsa-grey">
        <div class="rounded-full w-1.5 h-1.5 bg-amber-500" />
        1° etapa: 15 jan 2026 - 30 mar 2026
      </div>
      <div class="flex gap-2 items-center text-ldsa-grey">
        <div class="rounded-full w-1.5 h-1.5 bg-amber-500" />
        1° etapa: 15 jan 2026 - 30 mar 2026
      </div>
      <div class="flex gap-2 items-center text-ldsa-grey">
        <div class="rounded-full w-1.5 h-1.5 bg-amber-500" />
        1° etapa: 15 jan 2026 - 30 mar 2026
      </div>
    </div>
  </NuxtLink>
</template>
