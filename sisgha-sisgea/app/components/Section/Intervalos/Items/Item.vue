<script setup lang="ts">
defineProps<{
  intervalo: { inicio: string; fim: string };
  onRemove: () => void;
  onEdit?: () => void;
}>();
</script>

<template>
  <div
    class="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 mb-2 p-3 border-b-2 border-ldsa-grey/20"
  >
    <div class="font-medium text-[13px] whitespace-nowrap">
      {{ intervalo.inicio }} - {{ intervalo.fim }}
    </div>
    <div class="flex gap-4 text-sm">
      <button @click="onEdit" class="w-[0.9rem] hover:text-ldsa-green-1">
        <IconsEdit />
      </button>
      <button @click="onRemove" class="w-[0.9rem] hover:text-ldsa-red">
        <IconsExclude />
      </button>
    </div>
  </div>
</template>
