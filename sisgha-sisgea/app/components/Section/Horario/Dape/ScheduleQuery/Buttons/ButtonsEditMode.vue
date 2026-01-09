<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';

// const selectedItemsSize = computed(
//   () => useSelectedCells({ action: 'getAll', get: 'ids' }).value.size ?? 0
// );

defineEmits(['disable-edit-mode', 'toggle-show-breaks']);
</script>

<template>
  <span class="flex gap-2.5">
    <slot> </slot>

    <!-- <div class="divider" /> -->

    <!-- <Button
      text="Limpar seleção"
      :disabled="selectedItemsSize === 0"
      @click="useSelectedCells({ action: 'removeAll' })"
    >
      <IconsBroom class="w-4.5" />
    </Button> -->

    <Button text="Intervalos" @click="$emit('toggle-show-breaks')">
      <IconsEyeOn class="w-5" />
    </Button>

    <div class="divider" />

    <Button @click="$emit('disable-edit-mode')" color="var(--ladesa-red-color)">
      <IconsClose class="w-4" />
    </Button>

    <Button
      @click="$emit('disable-edit-mode')"
      color="var(--ladesa-text-green-color)"
    >
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
