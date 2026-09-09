<script lang="ts" setup>
import IconClose from '../icons/Close.vue';
import Title from './Title.vue';

export type ModalBaseLayoutProps = {
  title?: string;
  closeButton?: boolean;
  onClose: () => unknown;
  contentClass?: string;
};

const { title = 'Título', closeButton = true } =
  defineProps<ModalBaseLayoutProps>();
</script>

<template>
  <div class="ui-modal-layout">
    <header class="ui-modal-layout__header">
      <Title variant="small" :text="title" />

      <button
        v-if="closeButton"
        type="button"
        class="ui-modal-layout__close"
        @click="onClose"
      >
        <IconClose class="ui-modal-layout__close-icon" />
      </button>
    </header>

    <main class="ui-modal-layout__content" :class="contentClass">
      <slot />
    </main>

    <footer v-if="$slots['button-group']" class="ui-modal-layout__buttons">
      <slot name="button-group" />
    </footer>
  </div>
</template>
