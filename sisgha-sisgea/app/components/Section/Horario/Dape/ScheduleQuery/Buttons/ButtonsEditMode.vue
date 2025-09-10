<script setup lang="ts">
import { useSelectedCells } from '~/composables/schedule/edit/useSelectedScheduleCells';
import Button from './ScheduleQueryButton.vue';
const editMode = defineModel<boolean>({ default: false });

const selectedItemsSize = computed(
  () => useSelectedCells({ action: 'getAll', get: 'ids' }).value.size ?? 0
);

defineEmits(['undo', 'redo', 'swap', 'replace']);
</script>

<template>
  <span class="flex gap-2.5">
    <Button @click="$emit('redo')">
      <IconsUndoRedo class="w-4 scale-x-[-1]" />
    </Button>

    <Button @click="$emit('undo')">
      <IconsUndoRedo class="w-4" />
    </Button>

    <div class="divider" />

    <Button :disabled="selectedItemsSize !== 2" @click="$emit('swap')">
      <IconsSwap class="w-4" />
    </Button>

    <Button :disabled="selectedItemsSize !== 2" @click="$emit('replace')">
      <IconsReplace class="w-5" />
    </Button>

    <div class="divider" />

    <Button
      text="Limpar seleção"
      :disabled="selectedItemsSize === 0"
      @click="useSelectedCells({ action: 'removeAll' })"
    >
      <IconsBroom class="w-4.5" />
    </Button>

    <div class="divider" />

    <Button @click="editMode = false" color="var(--ladesa-red-color)">
      <IconsClose class="w-4" />
    </Button>

    <Button @click="editMode = false" color="var(--ladesa-text-green-color)">
      <IconsConfirm class="w-5" />
    </Button>
  </span>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.divider {
  @apply h-full min-h-10 w-0.5 bg-ldsa-grey/40 mx-2.5;
}
</style>
