<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  start?: string | null;
  end?: string | null;
  label?: string;
  disabled?: boolean;
  error?: string;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  'update:start': [value: string | null];
  'update:end': [value: string | null];
}>();

const hasError = computed(() => !!props.error);
</script>

<template>
  <div class="ui-time-range-field">
    <div class="ui-input-base ui-input-base--centered" :class="{ 'ui-input-has-error': hasError }">
      <label v-if="label">{{ label }}</label>

      <div class="ui-time-range-field__row">
        <input
          type="time"
          :value="start ?? ''"
          :disabled="disabled"
          :readonly="readonly"
          class="ui-time-field__input"
          @input="
            emit(
              'update:start',
              ($event.target as HTMLInputElement).value || null
            )
          "
        />

        <span class="ui-time-range-field__separator">—</span>

        <input
          type="time"
          :value="end ?? ''"
          :disabled="disabled"
          :readonly="readonly"
          class="ui-time-field__input"
          @input="
            emit(
              'update:end',
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
