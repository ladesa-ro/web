<script setup lang="ts">
import type { FieldMeta } from '../-Utils/inputTypes';

defineProps<FieldMeta>();
// TODO: adicionar type password e type number

const inputValue = defineModel<string>({ required: true, default: '' });
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

<style scoped src="../-Utils/style/inputStyles.css"></style>

<style scoped>
.input-base {
  padding: 0;
}
</style>
