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

    <template v-if="type === 'color'">
      <div class="relative w-full flex items-center gap-2 p-2 pl-4">
        <input
          type="color"
          :value="modelValue"
          @input="
            (e: Event) =>
              emit('update:modelValue', (e.target as HTMLInputElement).value)
          "
          class="absolute inset-0 w-[2rem] h-full opacity-0 cursor-pointer"
        />

        <div
          class="h-7 w-7 rounded-md"
          :style="{ backgroundColor: String(modelValue || '#000000') }"
        ></div>

        <span class="text-sm font-medium px-2">
          {{ String(modelValue).toUpperCase() }}
        </span>
      </div>
    </template>

    <template v-else>
      <input
        class="w-full px-3 pt-2.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="
          (e: Event) =>
            emit('update:modelValue', (e.target as HTMLInputElement).value)
        "
        @blur="emit('blur')"
      />
    </template>
  </div>
  <p v-if="error" class="text-ldsa-red text-xs font-semibold mt-1">
    {{ error }}
  </p>
</template>

<style scoped src="../-Utils/style/inputStyles.css"></style>

<style scoped>
.input-base {
  padding: 0;
}
</style>
