<script setup lang="ts">
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
  <div class="flex flex-col gap-1">
    <div class="input-base justify-center" :class="{ 'has-error': hasError }">
      <label v-if="label">{{ label }}</label>

      <div class="flex items-center justify-center gap-0.5 py-2 tabular-nums">
        <input
          type="time"
          :value="modelValue ?? ''"
          :disabled="disabled"
          :readonly="readonly"
          class="bg-transparent text-ldsa-text-default text-center focus:outline-none disabled:opacity-40"
          @input="
            emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value || null
            )
          "
        />
      </div>
    </div>

    <p v-if="error" class="text-ldsa-red text-xs font-semibold px-1">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
@import '~/components/UI/Form/-Utils/style/inputStyles.css';
</style>
