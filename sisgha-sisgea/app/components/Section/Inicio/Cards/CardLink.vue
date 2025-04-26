<script lang="ts" setup>
defineProps<{
  icon: any,
  title: string
}>();
</script>

<template>
  <div class="bg-ldsa-green-1/5 border border-ldsa-green-1/50 rounded-md p-6 flex flex-col items-center max-w-xs mb-5">
    <component :is="icon" class="w-16 h-16 mb-4" />
    <span class="text-ldsa-text-green text-[15px] font-bold">{{ title }}</span>
  </div>
</template>