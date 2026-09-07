<script setup lang="ts">
defineProps<{ type: string }>();

// const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);
</script>

<template>
  <div
    v-show="showBreaks ? true : type !== 'intervalo'"
    class="grid-cell-not-editable"
  >
    <div class="grid-cell-not-editable__content u-py-0-5 u-text-center u-h-full">
      <span v-if="type === 'intervalo'" class="grid-cell-not-editable__label">
        Intervalo
      </span>

      <span v-else>-</span>
    </div>
  </div>
</template>

<style scoped>
.grid-cell-not-editable {
  border-bottom: 2px solid rgb(from var(--ladesa-grey-color) R G B / 50%);
  min-height: 1.5rem;
}

.grid-cell-not-editable:last-child {
  border-bottom: 0;
}

@media (max-width: 1023.98px) {
  .grid-cell-not-editable {
    height: 3rem;
  }
}

.grid-cell-not-editable__content {
  font-size: 0.813rem;
}

.grid-cell-not-editable__label {
  color: rgb(from var(--ladesa-text-default-color) R G B / 50%);
}
</style>
