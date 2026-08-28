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
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-ldsa-grey px-1">
      {{ label }}
    </label>

    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows ?? 4"
      class="w-full px-3 py-2.5 rounded-md border border-ldsa-grey/30 bg-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-ldsa-green-1"
      @blur="handleBlur"
    />

    <p v-if="errorMessage" class="text-ldsa-red text-xs font-semibold px-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
