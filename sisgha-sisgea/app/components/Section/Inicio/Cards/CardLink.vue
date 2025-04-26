<script lang="ts" setup>
defineProps<{
  icon: any,
  title: string
}>();
</script>

<template>
  <div class="bg-green-50 border border-[color:#2F9E41] rounded-md p-6 flex flex-col items-center max-w-xs mb-5">
    <component :is="icon" class="w-16 h-16 mb-4" />
    <span class="text-green-600 text-[15px] font-bold">{{ title }}</span>
  </div>
</template>