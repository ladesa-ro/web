<script lang="ts" setup>
const isActive = defineModel<boolean>({ default: false });

const {
  disableInlineBlock = false,
  pointerdownEvent = false,
  disabled = false,
  closeOnClickOutside = true,
} = defineProps<{
  disabled?: boolean;
  disableInlineBlock?: boolean;
  pointerdownEvent?: boolean;
  closeOnClickOutside?: boolean;
  mustHideInBigScreen?: boolean;
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
    :class="!disableInlineBlock && 'dialog-skeleton__activator--inline'"
    v-bind="$attrs"
    @pointerdown="!disabled && pointerdownEvent && onOpen()"
    @click="!disabled && !pointerdownEvent && onOpen()"
  >
    <slot name="activator" />
  </nav>

  <Transition name="modal">
    <Teleport to="body">
      <section
        v-if="isActive"
        :class="
          mustHideInBigScreen
            ? 'dialog-skeleton__overlay--hide-big-screen'
            : 'dialog-skeleton__overlay'
        "
      >
        <div
          class="dialog-skeleton__backdrop"
          @click="() => closeOnClickOutside && onClose()"
        />

        <div
          ref="modal"
          class="dialog-skeleton__modal-container"
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
.dialog-skeleton__activator--inline {
  display: inline-block;
}

.dialog-skeleton__overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 997;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.dialog-skeleton__overlay--hide-big-screen {
  top: 0;
  left: 0;
  z-index: 997;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

@media (max-width: 875px) {
  .dialog-skeleton__overlay--hide-big-screen {
    position: fixed;
    display: flex;
  }
}

@media (min-width: 875px) {
  .dialog-skeleton__overlay--hide-big-screen {
    display: none !important;
  }
}

.dialog-skeleton__backdrop {
  position: fixed;
  z-index: 998;
  width: 100%;
  height: 100%;
  background-color: rgb(from var(--ladesa-black-color) R G B / 35%);
  backdrop-filter: blur(2px);
  transition:
    opacity 500ms ease-in-out,
    backdrop-filter 500ms ease-in-out;
}

:global(.dark) .dialog-skeleton__backdrop {
  background-color: rgb(from var(--ladesa-white-color) R G B / 25%);
}

.dialog-skeleton__modal-container {
  z-index: 999;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
}

/* see the Vue documentation to learn more about Transition and Teleport animations. that's what the classes below do! */

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.modal-enter-from .dialog-skeleton__modal-container,
.modal-leave-to .dialog-skeleton__modal-container {
  transform: translateY(var(--ui-space-6)) scale(0.9);
}

.modal-enter-to .dialog-skeleton__modal-container,
.modal-leave-from .dialog-skeleton__modal-container {
  transform: translateY(0) scale(1);
}

.modal-enter-active .dialog-skeleton__modal-container,
.modal-leave-active .dialog-skeleton__modal-container {
  transition: all 300ms ease-out;
}
</style>
