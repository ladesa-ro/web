<template>
  <button
    class="buttonAddClassDay"
    type="button"
  >
    <i class="mdi mdi-plus mr-2"></i>
    Adicionar
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.buttonAddClassDay {
  width: 100%;
  padding: 1.12rem 1.25rem;
  border-radius: .5rem;
  height: auto;
  text-transform: none;
  border: 2px dashed #00d047;
  background-color: transparent;
  color: #00d047;
  font-weight: 700;
  @apply text-ldsa-green-2;
  /* Cor do texto para combinar com a borda */
}
</style>
