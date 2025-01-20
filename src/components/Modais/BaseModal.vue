<script setup lang="ts">
type Props = {
  title?: string;
  onClose: () => any;
};

type Slots = {
  default: () => any;
  'button-group': () => void;
};

const { title = 'Título' } = defineProps<Props>();
defineSlots<Slots>();
</script>

<template>
  <div class="modal-layout">
    <header class="header">
      <h1 class="title">{{ title }}</h1>

      <button class="close-button" @click="onClose">
        <IconsIconClose class="close-icon" />
      </button>
    </header>

    <main class="content">
      <slot>Conteúdo</slot>
    </main>

    <footer class="button-group">
      <!-- this slot is used for closing buttons, changing page buttons etc -->
      <slot name="button-group" />
    </footer>
  </div>
</template>

<style scoped>
.modal-layout {
  @apply min-w-80 max-w-[32rem] min-h-[19rem] max-h-[38rem];
  @apply flex flex-col justify-between items-center p-7;
  @apply shadow-xl border-[3px] border-ldsa-grey rounded-2xl bg-ldsa-bg;
}

.header {
  @apply w-full flex items-center justify-between;
}

.title {
  @apply flex items-center w-full text-xl font-bold;
  @apply before:inline-block before:w-1 before:h-[1em] before:mr-2 before:bg-ldsa-text-green;
}

.close-button {
  @apply flex items-center justify-center rounded-full;
  @apply hover:bg-ldsa-grey/30 transition-[background-color] duration-[225ms];
}

.close-icon {
  @apply text-ldsa-text-default w-3 h-2.5 m-2.5;
}

.content {
  @apply flex-1 overflow-y-auto my-5 w-full text-wrap;
}

.button-group {
  @apply flex justify-between gap-3 w-auto;
}
</style>
