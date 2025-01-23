<template>
  <VBtn
    type="button"
    color="#00d047"
    variant="outlined"
    append-icon="mdi-plus"
    class="buttonAddClassDay"
  >
    Adicionar
  </VBtn>
</template>

<style scoped>
.buttonAddClassDay {
  width: 100%;
  padding: 18px 20px;
  border-radius: 8px;
  height: auto;
  text-transform: none;
  border: 2px dashed #00d047; /* Borda pontilhada com a cor do botão */
  background-color: transparent; /* Para garantir que o fundo seja transparente */
  @apply text-ldsa-green-2; /* Cor do texto para combinar com a borda */
}

.buttonAddClassDay .v-btn__icon {
  @apply text-ldsa-green-2; /* Cor do ícone para combinar com a borda */
}
</style>
