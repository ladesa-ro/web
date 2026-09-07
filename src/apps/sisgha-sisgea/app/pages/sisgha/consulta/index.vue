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
    class="u-flex u-flex-col u-gap-6 consulta-horario"
  >
    <h1
      class="u-flex u-items-center u-gap-2 u-font-semibold consulta-horario__title"
    >
      <IconsClock class="u-shrink-0 consulta-horario__title-icon" />
      Selecionar Horário
    </h1>

    <SectionConsultaSelectionList />
  </UIContainer>
</template>

<style scoped>
.consulta-horario {
  padding-inline: 0;
}

@media (min-width: 640px) {
  .consulta-horario {
    padding-inline: 2.5rem;
  }
}

@media (min-width: 768px) {
  .consulta-horario {
    padding-inline: 4.5rem;
  }
}

@media (min-width: 1024px) {
  .consulta-horario {
    padding-inline: 6.25rem;
  }
}

.consulta-horario__title {
  font-size: 1.125rem;
}

@media (min-width: 640px) {
  .consulta-horario__title {
    font-size: 1.375rem;
  }
}

.consulta-horario__title-icon {
  width: 0.875rem;
}

@media (min-width: 640px) {
  .consulta-horario__title-icon {
    width: 1.125rem;
  }
}
</style>
