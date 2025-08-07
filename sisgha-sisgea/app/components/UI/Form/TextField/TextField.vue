<script setup lang="ts">
import type { TextFieldProps } from '../-Utils/inputTypes';

// TODO: adicionar suporte para error message
// TODO: adicionar o tal do emit blur (verificar na docs do radix)

const { type = 'text' } = defineProps<TextFieldProps>();

//

const inputValue = defineModel<string | number>({
  required: false,
  default: '',
});
</script>

<template>
  <div class="input-base min-h-4">
    <label for="input">{{ label }}</label>
    <input
      id="input"
      class="w-full h-full disabled:opacity-50"
      :class="$slots['default'] ? 'pl-3' : 'px-3'"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      :disabled="disabled"
      min="0"
    />

    <div v-if="$slots['default']" class="w-4 h-4 text-ldsa-grey mx-3">
      <!-- this slot suports an icon -->
      <slot />
    </div>
  </div>
</template>

<style scoped src="../-Utils/style/inputStyles.css"></style>

<style scoped>
.input-base {
  padding: 0;
}
</style>
