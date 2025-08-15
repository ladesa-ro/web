<script lang="ts" setup>
definePageMeta({
  layout: 'sisgha-consulta',
  auth: false,
});
</script>

<template>
  <!-- TODO: add variant mini em UIContainer -->
  <UIContainer variant="tighter" class="flex flex-col gap-5 px-25">
    <h1 class="flex items-center gap-2 text-[1.375rem] font-semibold">
      <IconsClock class="w-4.5" />
      Selecionar Horário
    </h1>

    <div></div>
    <NuxtLink to="/sisgha/consulta/horario" class="w-full">
      <UIButtonDefault class="w-full"> Ver horário </UIButtonDefault>
    </NuxtLink>
  </UIContainer>
</template>
