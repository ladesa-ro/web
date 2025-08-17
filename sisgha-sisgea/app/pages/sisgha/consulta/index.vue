<script lang="ts" setup>
definePageMeta({
  layout: 'sisgha-consulta',
  auth: false,
});
</script>

<template>
  <!-- TODO: add variant mini em UIContainer -->
  <UIContainer
    variant="tighter"
    class="flex flex-col gap-6 sm:px-10 md:px-18 lg:px-25"
  >
    <h1
      class="flex items-center gap-2 text-lg sm:text-[1.375rem] font-semibold"
    >
      <IconsClock class="w-3.5 sm:w-4.5" />
      Selecionar Horário
    </h1>

    <SectionConsultaSelectionList />
  </UIContainer>
</template>
