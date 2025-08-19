<script lang="ts" setup>
type Props = {
  title?: string;
  closeButton?: boolean;
  onClose: () => any;
};

const { title = 'Título', closeButton = true } = defineProps<Props>();
</script>

<template>
  <div class="modal-layout">
    <header class="header">
      <UITitle variant="small" :text="title" />

      <button v-if="closeButton" class="close-button" @click="onClose">
        <IconsClose class="close-icon" />
      </button>
    </header>

    <main class="content">
      <slot>Conteúdo</slot>
    </main>

    <footer v-if="$slots['button-group']" class="button-group">
      <!-- this slot is used for closing buttons, changing page buttons etc -->
      <slot name="button-group" />
    </footer>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.modal-layout {
  @apply w-full max-w-[95%] max-h-[85vh] min-h-[20vh];
  @apply sm:max-w-[31.5rem] sm:min-h-[15rem] p-4 sm:p-6;
  @apply flex flex-col justify-between items-center;
  @apply shadow-xl border-3 border-ldsa-grey rounded-2xl bg-ldsa-bg;
}

.header {
  @apply w-full flex items-center justify-between;
}

.close-button {
  @apply shrink-0 flex items-center justify-center rounded-full cursor-pointer;
  @apply hover:bg-ldsa-grey/30 transition-[background-color] duration-[225ms];
}

.close-icon {
  @apply text-ldsa-text-default w-3 h-2.5 m-2.5;
}

.content {
  @apply flex-1 flex flex-col gap-6 overflow-y-auto mt-5 w-full break-words;
  @apply max-h-[70vh];
}

.button-group {
  @apply flex max-sm:flex-col gap-3 w-full mt-6 mx-3;
}

.button-group:has(*):has(> :first-child:last-child) {
  @apply justify-center;
}

.button-group:has(*):not(:has(> :first-child:last-child)) {
  @apply justify-between;
}
</style>
