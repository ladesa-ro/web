<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    error?: string;
  }>(),
  {
    step: 1,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

function increment() {
  if (props.disabled) return;
  const next = props.modelValue + props.step;
  if (props.max !== undefined && next > props.max) return;
  emit('update:modelValue', next);
}

function decrement() {
  if (props.disabled) return;
  const next = props.modelValue - props.step;
  if (props.min !== undefined && next < props.min) return;
  emit('update:modelValue', next);
}

const canDecrement = computed(() =>
  !props.disabled && (props.min === undefined || props.modelValue - props.step >= props.min),
);

const canIncrement = computed(() =>
  !props.disabled && (props.max === undefined || props.modelValue + props.step <= props.max),
);
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="label"
      class="text-[0.813rem] font-semibold text-ldsa-grey px-1"
    >
      {{ label }}
    </label>

    <div class="flex items-center gap-2">
      <button
        type="button"
        :disabled="!canDecrement"
        class="flex items-center justify-center size-8 rounded-lg border border-ldsa-grey/30 text-ldsa-text-default transition-colors hover:bg-ldsa-grey/10 disabled:opacity-40 disabled:cursor-not-allowed"
        @click="decrement"
      >
        <span class="text-lg font-bold leading-none">−</span>
      </button>

      <span
        class="min-w-[2rem] text-center text-sm font-semibold text-ldsa-text-default tabular-nums"
      >
        {{ modelValue }}
      </span>

      <button
        type="button"
        :disabled="!canIncrement"
        class="flex items-center justify-center size-8 rounded-lg border border-ldsa-grey/30 text-ldsa-text-default transition-colors hover:bg-ldsa-grey/10 disabled:opacity-40 disabled:cursor-not-allowed"
        @click="increment"
      >
        <span class="text-lg font-bold leading-none">+</span>
      </button>
    </div>

    <p v-if="error" class="text-ldsa-red text-xs font-semibold px-1">
      {{ error }}
    </p>
  </div>
</template>
