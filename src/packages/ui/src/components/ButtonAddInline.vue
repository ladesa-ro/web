<script lang="ts" setup>
import IconAdd from '../icons/Add.vue';

export type ButtonAddInlineProps = {
  label: string;
  disabled?: boolean;
};

defineProps<ButtonAddInlineProps>();
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="ui-button-add-inline u-flex u-items-center u-justify-center u-gap-2 u-px-2 u-text-sm u-font-medium"
  >
    <p>{{ label }}</p>

    <IconAdd class="ui-button-add-inline__icon" />
  </button>
</template>
