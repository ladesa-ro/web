<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}>();

const {
  value: modelValue,
  errorMessage,
  handleBlur,
} = useField<string | null>(() => props.name, undefined, {
  validateOnValueUpdate: false,
});
</script>

<template>
  <div class="u-flex u-flex-col u-gap-1">
    <label v-if="label" class="u-text-sm u-font-medium u-px-1 textarea-field__label">
      {{ label }}
    </label>

    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows ?? 4"
      class="u-w-full u-px-3 u-py-2-5 u-rounded-md textarea-field__control"
      @blur="handleBlur"
    />

    <p v-if="errorMessage" class="u-text-xs u-font-semibold u-px-1 textarea-field__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.textarea-field__label {
  color: var(--ladesa-grey-color);
}

.textarea-field__control {
  border: 1px solid rgb(from var(--ladesa-grey-color) R G B / 30%);
  background-color: transparent;
  resize: none;
}

.textarea-field__control:disabled {
  opacity: var(--ui-disabled-opacity);
  cursor: not-allowed;
}

.textarea-field__control:focus {
  outline: none;
  border-color: var(--ladesa-green-1-color);
}

.textarea-field__error {
  color: var(--ladesa-red-color);
}
</style>
