<!-- TODO: refatorar 100% desse componente e torná-lo funcional -->

<template>
  <div class="chat-bubble bg-ldsa-bg mr-3.5">
    <div class="flex flex-col">
      <div class="py-2 px-4">Novo evento gerado.</div>
      <hr />
      <div class="py-2 px-4">O evento IFRO Party foi agendado.</div>
      <hr />
      <div class="py-2 px-4">Novo calendário cadastrado.</div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.chat-bubble {
  width: 35rem;
  max-width: 90vw;
  border: 0.125rem;
  border-radius: 0.625rem;
  font-weight: bold;
  @apply bg-ldsa-bg border-solid border-ldsa-green-1 text-ldsa-text-default;
}
</style>
