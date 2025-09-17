<script setup lang="ts">
import type { TextFieldProps } from '../-Utils/inputTypes';

const {
  type = 'text',
  error,
  label,
  placeholder,
  disabled,
  modelValue,
} = defineProps<
  TextFieldProps & { error?: string; modelValue?: string | number }
>();

const emit = defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <div
    class="input-base min-h-4 flex flex-col gap-1 rounded-md transition"
    :class="[error ? 'border border-red-500' : 'border border-gray-300']"
  >
    <label v-if="label" class="text-sm font-medium text-gray-700 px-1">{{
      label
    }}</label>

    <input
      class="w-full h-full px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none bg-white"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="
        e => emit('update:modelValue', (e.target as HTMLInputElement).value)
      "
      @blur="emit('blur')"
    />

    <p v-if="error" class="text-ldsa-red text-[11px] mb-1 px-1 text-left">
      {{ error }}
    </p>
  </div>
</template>

<style scoped src="../-Utils/style/inputStyles.css"></style>

<style scoped>
.input-base {
  padding: 0;
}
</style>
