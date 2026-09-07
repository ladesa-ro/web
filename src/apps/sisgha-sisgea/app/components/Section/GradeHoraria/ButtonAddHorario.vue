<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="u-flex u-items-center u-justify-center u-gap-2 u-px-2 u-text-sm u-font-medium grade-add-button"
  >
    <p>Adicionar horário de aula</p>
    <IconsAdd class="grade-add-button__icon" />
  </button>
</template>

<style scoped>
.grade-add-button {
  height: 1.875rem;
  color: var(--ladesa-grey-color);
  transition:
    background-color var(--ui-duration-fast) var(--ui-easing-standard),
    color var(--ui-duration-fast) var(--ui-easing-standard);
}

.grade-add-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
}

.grade-add-button:active {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.grade-add-button:disabled {
  color: rgb(from var(--ladesa-grey-color) R G B / 40%);
  background-color: transparent;
}

.grade-add-button__icon {
  width: 0.625rem;
}
</style>
