<script lang="ts" setup>
type Props = {
  label: string;
  curso: string;
  selected: boolean;
};

defineProps<Props>();

defineEmits<{ select: [] }>();
</script>

<template>
  <div
    class="u-flex u-items-center u-justify-between u-rounded-lg turma-select__item"
    :class="{ 'turma-select__item--selected': selected }"
    @click="$emit('select')"
  >
    <div class="u-flex u-flex-col">
      <span class="u-font-semibold u-text-sm turma-select__item-label">
        {{ label }}
      </span>
      <span class="u-text-xs turma-select__item-curso">{{ curso }}</span>
    </div>

    <div
      class="u-flex u-items-center u-justify-center u-shrink-0 u-rounded-full turma-select__radio"
      :class="{ 'turma-select__radio--selected': selected }"
    >
      <div v-if="selected" class="u-rounded-full turma-select__radio-dot" />
    </div>
  </div>
</template>

<style scoped>
.turma-select__item {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  padding: var(--ui-space-3) var(--ui-space-4);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.turma-select__item--selected {
  border-color: var(--ladesa-green-1-color);
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.turma-select__item-label {
  color: var(--ladesa-text-default-color);
}

.turma-select__item-curso {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.turma-select__radio {
  width: var(--ui-space-5);
  height: var(--ui-space-5);
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.turma-select__radio--selected {
  border-color: var(--ladesa-green-1-color);
}

.turma-select__radio-dot {
  width: var(--ui-space-3);
  height: var(--ui-space-3);
  background-color: var(--ladesa-green-1-color);
}
</style>
