<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string | null;
  disabled?: boolean;
  colors?: string[];
  error?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [color: string];
}>();

const PALETTE_COLORS = [
  '#2f9e41',
  '#1e5dcc',
  '#cd191e',
  '#b8a003',
  '#5300a6',
  '#e85d04',
  '#0d9488',
  '#db2777',
  '#6366f1',
  '#78716c',
] as const;

const paletteColors = computed(() => props.colors ?? [...PALETTE_COLORS]);

function selectColor(color: string) {
  if (props.disabled) return;
  emit('update:modelValue', color);
}
</script>

<template>
  <div class="ui-color-palette">
    <div
      class="ui-color-palette__swatches"
      :class="{ 'ui-color-palette__swatches--disabled': disabled }"
    >
      <button
        v-for="color in paletteColors"
        :key="color"
        type="button"
        :disabled="disabled"
        class="ui-color-palette__swatch"
        :class="[
          modelValue === color ? 'ui-color-palette__swatch--selected' : '',
        ]"
        :style="{
          backgroundColor: color,
          '--ui-swatch-ring-color': modelValue === color ? color : undefined,
        }"
        :aria-label="`Selecionar cor ${color}`"
        :aria-pressed="modelValue === color"
        @click="selectColor(color)"
      />
    </div>

    <p v-if="error" class="ui-input-error">
      {{ error }}
    </p>
  </div>
</template>
