<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { vMaska } from 'maska/vue';
import type { TextFieldProps } from '../-Utils/inputTypes';

const {
  type = 'text',
  error,
  label,
  placeholder,
  disabled,
  modelValue,
  mask,
} = defineProps<
  TextFieldProps & { error?: string; modelValue?: string | number }
>();

const emit = defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <template v-if="type === 'color'">
    <div
      v-bind="$attrs"
      class="relative inline-flex items-center p-1 cursor-pointer"
    >
      <input
        type="color"
        :value="modelValue"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @input="
          (e: Event) =>
            emit('update:modelValue', (e.target as HTMLInputElement).value)
        "
      />
      <div
        class="h-7 w-7 rounded-md border border-ldsa-grey/50"
        :style="{ backgroundColor: String(modelValue || '#000000') }"
      />
    </div>
  </template>

  <template v-else>
    <div>
      <div
        v-bind="$attrs"
        class="input-base min-h-4 flex flex-col gap-1 rounded-md transition"
        :class="{ 'has-error': !!error }"
      >
        <label v-if="label" class="text-sm font-medium text-ldsa-grey px-1">
          {{ label }}
        </label>

        <template v-if="mask">
          <input
            v-maska="mask"
            class="w-full px-3 pt-2.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
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
            class="w-full px-3 pt-2.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
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
      <p v-if="error" class="text-ldsa-red text-xs font-semibold mt-1">
        {{ error }}
      </p>
    </div>
  </template>
</template>

<style scoped>
@import '~/components/UI/Form/-Utils/style/inputStyles.css';

.input-base {
  padding: 0;
}
</style>
