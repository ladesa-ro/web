<script lang="ts" setup>
type Props = {
  title?: string;
  closeButton?: boolean;
  onClose: () => any;

  contentClass?: string;
};

const { title = 'Título', closeButton = true } = defineProps<Props>();
</script>

<template>
  <div class="modal-layout">
    <header class="header">
      <UITitle variant="small" :text="title" />

      <button
        v-if="closeButton"
        type="button"
        class="close-button"
        @click="onClose"
      >
        <IconsClose class="close-icon" />
      </button>
    </header>

    <main class="content" :class="contentClass">
      <slot>Conteúdo</slot>
    </main>

    <footer v-if="$slots['button-group']" class="button-group">
      <!-- this slot is used for closing buttons, changing page buttons etc -->
      <slot name="button-group" />
    </footer>
  </div>
</template>

<style scoped>
.modal-layout {
  width: 100%;
  max-width: 95%;
  max-height: 85vh;
  min-height: 20vh;
  padding: var(--ui-space-4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  border: 3px solid var(--ladesa-grey-color);
  border-radius: 1rem;
  background-color: var(--ladesa-background-color);
}

@media (min-width: 40rem) {
  .modal-layout {
    max-width: 31.5rem;
    min-height: 15rem;
    padding: var(--ui-space-6);
  }
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-button {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--ui-radius-full);
  cursor: pointer;
  transition: background-color 225ms;
}

.close-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.close-icon {
  color: var(--ladesa-text-default-color);
  width: var(--ui-space-3);
  height: var(--ui-space-2-5);
  margin: var(--ui-space-2-5);
}

.content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  gap: var(--ui-space-6);
  overflow-y: auto;
  margin-top: var(--ui-space-5);
  width: 100%;
  overflow-wrap: break-word;
  max-height: 70vh;
}

.button-group {
  display: flex;
  gap: var(--ui-space-3);
  width: 100%;
  margin-top: var(--ui-space-6);
  margin-inline: var(--ui-space-3);
}

@media (max-width: 639px) {
  .button-group {
    flex-direction: column;
  }

  .button-group > * {
    width: 100%;
  }
}

.button-group:has(*):has(> :first-child:last-child) {
  justify-content: center;
}

.button-group:has(*):not(:has(> :first-child:last-child)) {
  justify-content: space-between;
}
</style>
