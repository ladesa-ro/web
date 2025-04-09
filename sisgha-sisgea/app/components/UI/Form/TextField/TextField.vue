<script setup lang="ts">
import type { TextFieldProps } from '../-Utils/inputTypes';

const { type = 'text' } = defineProps<TextFieldProps>();

const inputValue = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <div class="input-base">
    <label for="input">{{ label }}</label>
    <input
      id="input"
      :type="type"
      class="w-full h-full px-3"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>

<style scoped src="../-Utils/style/inputStyles.css"></style>

<style scoped>
.input-base {
  padding: 0;
}
</style>
