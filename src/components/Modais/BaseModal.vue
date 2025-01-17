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
    <div v-if="show" class="backdrop">
      <main class="modal-layout">
        <h1 class="font-bold text-lg">{{ title }}</h1>

        <section class="overflow-auto">
          <slot name="content">Conteúdo do modal</slot>
        </section>

        <div class="min-h-5">
          <!-- this slot is used for closing buttons, changing page buttons etc -->
          <slot name="options">
            <UIButtonModalCancelButton @click="$emit('close')" />
          </slot>
        </div>
      </main>
    </div>
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
  @apply m-auto min-w-80 max-w-96 min-h-[18.938rem] max-h-[37.5rem] shadow-xl;
  @apply flex flex-col justify-between items-center p-5;
  @apply border-[3px] border-ldsa-grey rounded-lg bg-ldsa-bg;
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
  transition: opacity 0.25s ease-in-out;
}

.modal-enter-from .modal-layout,
.modal-leave-to .modal-layout {
  transform: translateY(1.5rem) scale(0.9);
}

.modal-enter-to .modal-layout,
.modal-leave-from .modal-layout {
  transform: translateY(0rem) scale(1);
}

.modal-enter-active .modal-layout {
  transition: all 0.3s ease-out;
}
.modal-leave-active .modal-layout {
  transition: all 0.3s ease-out;
}
</style>
