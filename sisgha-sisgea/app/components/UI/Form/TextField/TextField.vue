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
    :class="{ 'has-error': !!error }"
  >
    <label v-if="label" class="text-sm font-medium text-ldsa-grey px-1">
      {{ label }}
    </label>

    <input
      class="w-full h-full px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="
        e => emit('update:modelValue', (e.target as HTMLInputElement).value)
      "
      @blur="emit('blur')"
    />
    <div class="">
      <p v-if="error" class="text-ldsa-red text-[11px] mb-1 px-1 text-left">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped src="../-Utils/style/inputStyles.css"></style>

<style scoped>
.input-base {
  padding: 0;
  border-width: 1px;
}
</style>
