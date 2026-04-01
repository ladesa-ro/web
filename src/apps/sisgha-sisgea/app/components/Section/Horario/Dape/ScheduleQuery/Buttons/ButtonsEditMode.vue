<script setup lang="ts">
import Button from './ScheduleQueryButton.vue';

// const selectedItemsSize = computed(
//   () => useSelectedCells({ action: 'getAll', get: 'ids' }).value.size ?? 0
// );

const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);
</script>

<template>
  <span v-if="editMode" class="flex gap-2.5">
    <slot/>

    <!-- <div class="divider" /> -->

    <!-- <Button
      text="Limpar seleção"
      :disabled="selectedItemsSize === 0"
      @click="useSelectedCells({ action: 'removeAll' })"
    >
      <IconsBroom class="w-4.5" />
    </Button> -->

    <Button text="Intervalos" @click="showBreaks = !showBreaks">
      <IconsEyeOff v-show="showBreaks" class="w-5" />
      <IconsEyeOn v-if="!showBreaks" class="w-5" />
    </Button>

    <div class="divider" />

    <Button color="var(--ladesa-red-color)" @click="editMode = false">
      <IconsClose class="w-4" />
    </Button>

    <Button color="var(--ladesa-text-green-color)" @click="editMode = false">
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
