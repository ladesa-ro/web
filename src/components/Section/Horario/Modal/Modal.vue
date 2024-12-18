<template>
  <v-dialog v-model="isActive" class="" max-width="450">
    <template v-slot:activator="{ props: activatorProps }">
      <span class="description cursor-pointer" v-bind="activatorProps">
        Clique aqui no icone de adicionar disciplina.
      </span>
    </template>

    <template v-slot:="{ isActive }">
      <v-card class="dialog-style">
        <SectionHorarioForm @close="isActive.value = false" />
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
const isActive = ref(false);
</script>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
}

.description {
  color: #118d3b;
}
</style>
