<script setup lang="ts">
import type { CommonProps } from '../CommonProps';

defineProps<CommonProps>();

const inputValue = defineModel<string>({ required: false, default: '' });
</script>

<template>
  <div class="input-base">
    <label for="input">{{ label }}</label>
    <input
      id="input"
      type="text"
      class="w-full h-full px-3"
      :placeholder="placeholder"
      v-model="inputValue"
    />
  </div>
</template>

<style scoped src="../styles/InputBase.css"></style>

<style scoped>
.input-base {
  padding: 0;
}
</style>
