<script lang="ts" setup>
defineProps<{
  nome: string;
  isEditing: boolean;
  disabled?: boolean;
  hasError?: boolean;
}>();

defineEmits<{ 'update:nome': [value: string]; 'remove-grade': [] }>();
</script>

<template>
  <div
    class="u-flex u-items-center u-gap-2 u-flex-1 grade-accordion__title-wrap"
  >
    <template v-if="isEditing">
      <input
        :value="nome"
        :disabled="disabled"
        placeholder="Nome da grade horária"
        class="u-px-2 u-py-1 u-text-sm u-font-semibold u-flex-1 grade-accordion__name-input"
        :class="
          hasError
            ? 'grade-accordion__name-input--error'
            : 'grade-accordion__name-input--default'
        "
        @input="$emit('update:nome', ($event.target as HTMLInputElement).value)"
        @click.stop
      />
      <button
        :disabled="disabled"
        class="u-text-sm u-px-2 u-shrink-0 grade-accordion__remove-btn"
        title="Remover grade horária"
        @click.stop="$emit('remove-grade')"
      >
        <IconsExclude class="grade-accordion__remove-icon" />
      </button>
    </template>
    <template v-else>
      <span class="u-font-semibold u-truncate grade-accordion__title-static">
        {{ nome || 'Grade sem nome' }}
      </span>
    </template>
  </div>
</template>

<style scoped>
.grade-accordion__title-wrap {
  min-width: 0;
}

.grade-accordion__name-input {
  min-width: 0;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--ui-radius-md);
  color: var(--ladesa-white-color);
}

.grade-accordion__name-input::placeholder {
  color: rgb(from var(--ladesa-white-color) R G B / 60%);
}

.grade-accordion__name-input:disabled {
  opacity: 0.4;
}

.grade-accordion__name-input--error {
  border-color: var(--ladesa-red-color);
  background-color: rgb(from var(--ladesa-red-color) R G B / 20%);
}

.grade-accordion__name-input--default {
  border-color: rgb(from var(--ladesa-white-color) R G B / 30%);
  background-color: rgb(from var(--ladesa-white-color) R G B / 20%);
}

.grade-accordion__remove-btn {
  color: rgb(from var(--ladesa-white-color) R G B / 80%);
}

.grade-accordion__remove-btn:hover {
  color: var(--ladesa-white-color);
}

.grade-accordion__remove-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.grade-accordion__remove-icon {
  width: 1rem;
  height: 1rem;
}

.grade-accordion__title-static {
  color: var(--ladesa-white-color);
}
</style>
