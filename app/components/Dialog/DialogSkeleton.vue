<script setup lang="ts">
const isActive = defineModel({default: false});

const onOpen = () => isActive.value = true;
const onClose = () => isActive.value = false;
</script>

<template>
  <nav class="inline-block" @click="onOpen">
    <slot name="activator" />
  </nav>

  <Transition name="modal">
    <!-- dialog content -->
    <Teleport to="body">
      <section v-if="isActive" class="overlay-layout">
        <div class="backdrop" @click="onClose" />

        <div class="modal-container">
          <slot />
        </div>
      </section>
    </Teleport>
  </Transition>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.overlay-layout {
  @apply fixed top-0 left-0 z-[997];
  @apply flex items-center justify-center h-screen w-screen;
}

.backdrop {
  @apply fixed z-[998] w-full h-full;
  @apply bg-ldsa-bg/35;
  @apply transition-[opacity] duration-300;
}

.modal-container {
  @apply z-[999];
  @apply transition-[all] duration-300;
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

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  @apply translate-y-6 scale-90;
}

.modal-enter-to .modal-container,
.modal-leave-from .modal-container {
  @apply translate-y-0 scale-100;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  @apply transition-[all] duration-300 ease-out;
}
</style>
