<script lang="ts" setup>
export type ButtonModalBaseLayoutProps = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  opacity?: number;
  variant?: 'small' | 'normal';
};
const {
  text = 'Texto',
  color = 'black',
  opacity = 100,
  variant = 'normal',
} = defineProps<ButtonModalBaseLayoutProps>();

const defineColor = {
  '--color': `rgb(from ${color} R G B / ${opacity / 100})`,
};
</script>

<template>
  <button
    :style="defineColor"
    :type="type"
    class="ui-button-modal"
    :class="`ui-button-modal--${variant}`"
  >
    <p class="ui-button-modal__label">{{ text }}</p>

    <span v-if="$slots['default']" :class="`ui-button-modal__icon--${variant}`">
      <slot />
    </span>
  </button>
</template>
