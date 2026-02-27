<template>
  <NuxtLink
    :to="''"
    class="p-5 rounded-lg border-2 border-ldsa-grey flex flex-col gap-3.5 hover:bg-ldsa-grey/10 h-full"
  >
    <div class="flex-1 flex justify-between items-center">
      <div class="flex gap-2 items-center font-medium text-lg">
        <div class="rounded-full w-2.5 h-2.5 bg-amber-500" />
        <h1 class="">Campus Party 2026</h1>
      </div>

      <UIButtonEdit />
    </div>

    <span class="text-sm"> 7 jun 2026 - 8 ago 2026 </span>

    <div class="flex flex-col gap-1.5 text-sm text-ldsa-grey">
      <span> Formação: Técnico Integrado </span>
      <span> Professores: Danilo Escudero, Wanderson Roger </span>
      <span> Turmas: 3°A Informática, 3°B Informática </span>
    </div>

    <SectionCalendarioEventLocale locale="Biblioteca" />
  </NuxtLink>
</template>
