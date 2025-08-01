<script lang="ts" setup>
const isActive = defineModel<boolean>({ default: false });

const { disableInlineBlock = false } = defineProps<{
  disableInlineBlock?: boolean;
}>();

const modal = useTemplateRef('modal');

const onOpen = async () => {
  isActive.value = true;

  // wait the modal is mounted before focus it
  await nextTick();

  if (modal.value) modal.value.focus();
};

const onClose = () => (isActive.value = false);
</script>

<template>
  <nav
    :class="[!disableInlineBlock && 'inline-block']"
    v-bind="$attrs"
    @click="onOpen"
  >
    <slot name="activator" />
  </nav>

  <Transition name="modal">
    <Teleport to="body">
      <section v-if="isActive" class="overlay-layout">
        <div class="backdrop" @click="onClose" />

        <div
          class="modal-container"
          ref="modal"
          tabindex="0"
          @keyup.esc="onClose"
        >
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
  @apply bg-ldsa-black/35 dark:bg-ldsa-white/25;
  @apply transition-[opacity] duration-300;
}

.modal-container {
  @apply z-[999] max-h-screen max-w-[95%] p-7;
  @apply flex items-center justify-center;
  @apply rounded-2xl;
  @apply transition-[all] duration-300;
}

/* see the Vue documentation to learn more about Transition and Teleport animations. that's what the classes below do! */

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
