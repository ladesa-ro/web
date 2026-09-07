<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { type MaskInputOptions } from 'maska';
import { vMaska } from 'maska/vue';
import { computed } from 'vue';
import type { FormTextFieldProps } from './form-input-types';

type Props = FormTextFieldProps & { error?: string; modelValue?: string | number };

const {
  type = 'text',
  error,
  label,
  placeholder,
  disabled,
  modelValue,
  mask,
} = defineProps<Props>();

const maskOptions = computed((): MaskInputOptions | null => {
  if (mask) {
    return {
      mask,
      eager: true,
    };
  }
  return null;
});

const emit = defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <template v-if="type === 'color'">
    <div v-bind="$attrs" class="ui-text-field-color">
      <input
        type="color"
        :value="modelValue"
        class="ui-text-field-color__input"
        @input="
          (e: Event) =>
            emit('update:modelValue', (e.target as HTMLInputElement).value)
        "
      />
      <div
        class="ui-text-field-color__swatch"
        :style="{ backgroundColor: String(modelValue || '#000000') }"
      />
    </div>
  </template>

  <template v-else>
    <div>
      <div v-bind="$attrs" class="ui-input-base" :class="{ 'ui-input-has-error': !!error }">
        <label v-if="label">
          {{ label }}
        </label>

        <template v-if="maskOptions">
          <input
            v-maska="maskOptions"
            class="ui-text-field__input"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @maska="(e: any) => emit('update:modelValue', e.detail.masked)"
            @blur="emit('blur')"
          />
        </template>

        <template v-else>
          <input
            class="ui-text-field__input"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            @input="
              (e: Event) =>
                emit('update:modelValue', (e.target as HTMLInputElement).value)
            "
            @blur="emit('blur')"
          />
        </template>
      </div>
      <p v-if="error" class="ui-input-error">
        {{ error }}
      </p>
    </div>
  </template>
</template>
