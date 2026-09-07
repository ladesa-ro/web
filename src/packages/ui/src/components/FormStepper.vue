<script lang="ts" setup>
import { computed } from 'vue';

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
  }
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

const canDecrement = computed(
  () =>
    !props.disabled &&
    (props.min === undefined || props.modelValue - props.step >= props.min)
);

const canIncrement = computed(
  () =>
    !props.disabled &&
    (props.max === undefined || props.modelValue + props.step <= props.max)
);
</script>

<template>
  <div class="ui-stepper">
    <label v-if="label" class="ui-stepper__label">
      {{ label }}
    </label>

    <div class="ui-stepper__controls">
      <button
        type="button"
        :disabled="!canDecrement"
        class="ui-stepper__button"
        @click="decrement"
      >
        <span class="ui-stepper__button-symbol">−</span>
      </button>

      <span class="ui-stepper__value">
        {{ modelValue }}
      </span>

      <button
        type="button"
        :disabled="!canIncrement"
        class="ui-stepper__button"
        @click="increment"
      >
        <span class="ui-stepper__button-symbol">+</span>
      </button>
    </div>

    <p v-if="error" class="ui-input-error">
      {{ error }}
    </p>
  </div>
</template>
