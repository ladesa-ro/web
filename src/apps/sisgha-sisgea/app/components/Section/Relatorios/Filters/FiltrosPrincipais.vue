<script setup lang="ts"></script>

<template>
  <div class="filtros-principais__grid u-grid u-gap-4 u-w-full">
    <VVAutocompleteAPIProfessor
      class="filtros-principais__professor u-w-full"
      name="professor.id"
    />

    <VVAutocompleteAPICalendarioLetivo
      class="u-w-full"
      name="calendarioLetivo.id"
    />
  </div>
</template>

<style scoped>
.filtros-principais__grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 1280px) {
  .filtros-principais__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .filtros-principais__professor {
    grid-column: span 2 / span 2;
  }
}
</style>
