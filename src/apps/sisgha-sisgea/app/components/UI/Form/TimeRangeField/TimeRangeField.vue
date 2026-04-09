<script setup lang="ts">
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
  <div class="flex flex-col gap-1">
    <div class="input-base input-range" :class="{ 'has-error': hasError }">
      <label v-if="label">{{ label }}</label>

      <div class="flex items-center justify-center gap-1 py-2 tabular-nums">
        <input
          type="time"
          :value="start ?? ''"
          :disabled="disabled"
          :readonly="readonly"
          class="bg-transparent text-ldsa-text-default text-center focus:outline-none disabled:opacity-40"
          @input="
            emit(
              'update:start',
              ($event.target as HTMLInputElement).value || null
            )
          "
        />

        <span class="text-ldsa-grey select-none px-1">—</span>

        <input
          type="time"
          :value="end ?? ''"
          :disabled="disabled"
          :readonly="readonly"
          class="bg-transparent text-ldsa-text-default text-center focus:outline-none disabled:opacity-40"
          @input="
            emit(
              'update:end',
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
@reference "~/assets/styles/app.css";

.input-base.input-range {
  @apply justify-center;
}
</style>

<style scoped>
@import '~/components/UI/Form/-Utils/style/inputStyles.css';
</style>
