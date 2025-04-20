<script setup lang="ts">
import type { TextFieldProps } from '../-Utils/inputTypes';

const { type = 'text' } = defineProps<TextFieldProps>();

//

type Slots = { default(): any };
defineSlots<Slots>();

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
      class="w-full h-full"
      :class="$slots['default'] ? 'pl-3' : 'px-3'"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
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
