<script setup lang="ts">
type Props = {
  show: boolean;
  title?: string;
};

type Emits = {
  close: void;
};

const { title = 'Título' } = defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <Transition name="modal">
    <section v-if="show" class="backdrop">
      <div class="modal-layout">
        <header class="header">
          <h1 class="title">{{ title }}</h1>

          <button class="close-button" @click="$emit('close')">
            <IconsIconClose class="close-icon" />
          </button>
        </header>

        <main class="content">
          <slot name="content">Conteúdo</slot>
        </main>

        <nav class="options">
          <!-- this slot is used for closing buttons, changing page buttons etc -->
          <slot name="options" />
        </nav>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.backdrop {
  @apply fixed top-0 left-0 z-[999] w-full h-full;
  @apply flex bg-ldsa-black/35 dark:bg-ldsa-white/25;
  @apply transition-[opacity_0.3s_ease];
}

.modal-layout {
  @apply transition-[all_0.3s_ease];
  @apply m-auto min-w-80 max-w-[32rem] min-h-[19rem] max-h-[38rem] shadow-xl;
  @apply flex flex-col justify-between items-center p-7;
  @apply border-[3px] border-ldsa-grey rounded-2xl bg-ldsa-bg;
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
  @apply hover:bg-ldsa-grey/30 transition-[background_0.5s_linear];
}

.close-icon {
  @apply text-ldsa-text-default w-3 h-2.5 m-2.5;
}

.content {
  @apply flex-1 overflow-y-auto my-5 w-full text-wrap;
}

.options {
  @apply flex justify-between gap-3 w-auto;
}

/* 
 * bellow is the animation to open and close the modal
 * see the vue transition component documentation to learn more
 */

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-[opacity] duration-[0.25s] ease-in-out;

}

.modal-enter-from .modal-layout,
.modal-leave-to .modal-layout {
  @apply translate-y-6 scale-90;
}

.modal-enter-to .modal-layout,
.modal-leave-from .modal-layout {
  @apply translate-y-0 scale-100;
}

.modal-enter-active .modal-layout,
.modal-leave-active .modal-layout {
  @apply transition-[all] duration-300 ease-out;
}
</style>
