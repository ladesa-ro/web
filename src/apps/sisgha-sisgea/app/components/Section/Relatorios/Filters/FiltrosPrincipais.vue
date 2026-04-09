<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">
    <VVAutocompleteAPIProfessor
      class="w-full xl:col-span-2"
      name="professor.id"
    />

    <VVAutocompleteAPICalendarioLetivo
      class="w-full"
      name="calendarioLetivo.id"
    />
  </div>
</template>
