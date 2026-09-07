<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: string | null;
  label?: string;
  disabled?: boolean;
  error?: string;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
}>();

const hasError = computed(() => !!props.error);
</script>

<template>
  <div class="ui-time-field">
    <div class="ui-input-base ui-input-base--centered" :class="{ 'ui-input-has-error': hasError }">
      <label v-if="label">{{ label }}</label>

      <div class="ui-time-field__row">
        <input
          type="time"
          :value="modelValue ?? ''"
          :disabled="disabled"
          :readonly="readonly"
          class="ui-time-field__input"
          @input="
            emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value || null
            )
          "
        />
      </div>
    </div>

    <p v-if="error" class="ui-input-error">
      {{ error }}
    </p>
  </div>
</template>
