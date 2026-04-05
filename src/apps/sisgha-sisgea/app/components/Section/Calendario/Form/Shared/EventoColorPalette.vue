<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | null;
  disabled?: boolean;
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

function selectColor(color: string) {
  if (props.disabled) return;
  emit('update:modelValue', color);
}
</script>

<template>
  <div class="flex flex-wrap gap-2.5" :class="{ 'opacity-60 cursor-not-allowed': disabled }">
    <button
      v-for="color in PALETTE_COLORS"
      :key="color"
      type="button"
      :disabled="disabled"
      class="size-7 rounded-full border-2 shrink-0 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed"
      :class="[
        modelValue === color
          ? 'border-ldsa-green-2 ring-2 ring-offset-2 scale-110'
          : 'border-transparent hover:scale-110',
      ]"
      :style="{
        backgroundColor: color,
        '--tw-ring-color': modelValue === color ? color : undefined,
      }"
      :aria-label="`Selecionar cor ${color}`"
      :aria-pressed="modelValue === color"
      @click="selectColor(color)"
    />
  </div>
</template>
