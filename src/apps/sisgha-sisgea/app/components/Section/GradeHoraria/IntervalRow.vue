<script lang="ts" setup>
defineProps<{
  start: string;
  end: string;
  inicio: string;
  fim: string;
  isEditing: boolean;
  disabled?: boolean;
  error?: string;
}>();

defineEmits<{
  'update:start': [value: string];
  'update:end': [value: string];
  remove: [];
}>();
</script>

<template>
  <div
    class="u-flex u-flex-wrap u-items-center u-justify-center u-gap-2 u-p-3 grade-accordion__interval-row"
    :class="
      error
        ? 'grade-accordion__interval-row--error'
        : 'grade-accordion__interval-row--default'
    "
  >
    <template v-if="isEditing">
      <UIFormTimeRangeField
        :start="start"
        :end="end"
        :disabled="disabled"
        :error="error"
        class="u-flex-1"
        @update:start="$emit('update:start', $event ?? '')"
        @update:end="$emit('update:end', $event ?? '')"
      />
      <button
        :disabled="disabled"
        class="u-shrink-0 grade-accordion__remove-interval-btn"
        @click="$emit('remove')"
      >
        <IconsExclude />
      </button>
    </template>
    <template v-else>
      <div class="u-font-medium grade-accordion__interval-static">
        {{ inicio }} - {{ fim }}
      </div>
    </template>
  </div>
</template>

<style scoped>
.grade-accordion__interval-row {
  border-bottom-width: 2px;
  border-bottom-style: solid;
}

@media (min-width: 768px) {
  .grade-accordion__interval-row {
    flex-wrap: nowrap;
  }
}

.grade-accordion__interval-row--error {
  border-bottom-color: rgb(from var(--ladesa-red-color) R G B / 30%);
}

.grade-accordion__interval-row--default {
  border-bottom-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.grade-accordion__interval-static {
  font-size: 0.8125rem;
  white-space: nowrap;
}

.grade-accordion__remove-interval-btn {
  width: 0.9rem;
}

.grade-accordion__remove-interval-btn:hover {
  color: var(--ladesa-red-color);
}

.grade-accordion__remove-interval-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
