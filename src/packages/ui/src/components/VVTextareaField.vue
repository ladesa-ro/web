<script lang="ts" setup>
import { useField } from 'vee-validate';

export type VVTextareaFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
};

const props = defineProps<VVTextareaFieldProps>();

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
    <label
      v-if="label"
      class="ui-textarea-field__label u-text-sm u-font-medium u-px-1"
    >
      {{ label }}
    </label>

    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows ?? 4"
      class="ui-textarea-field__control u-w-full u-px-3 u-py-2-5 u-rounded-md"
      @blur="handleBlur"
    />

    <p
      v-if="errorMessage"
      class="ui-field-error u-text-xs u-font-semibold u-px-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
