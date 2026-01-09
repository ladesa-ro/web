<script setup lang="ts">
defineProps<{ type: string }>();

// const editMode: Ref<boolean> = inject('editMode') ?? ref(false);
const showBreaks: Ref<boolean> = inject('showBreaks') ?? ref(false);
</script>

<template>
  <div
    v-show="showBreaks ? true : type !== 'intervalo'"
    class="border-b-2 last:border-b-0 border-b-ldsa-grey/50 min-h-6"
  >
    <div class="last:border-b-0 py-0.5 text-center text-[0.813rem] h-full">
      <span v-if="type === 'intervalo'" class="text-ldsa-text-default/50">
        Intervalo
      </span>

      <span v-else>-</span>
    </div>
  </div>
</template>
