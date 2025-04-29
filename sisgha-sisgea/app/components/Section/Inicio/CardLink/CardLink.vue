<script lang="ts" setup>
defineProps<{
  to: string;
  icon: any;
  title: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="bg-ldsa-green-1/5 border border-ldsa-green-1/50 rounded-md p-6 flex flex-col items-center"
  >
    <component :is="icon" class="w-16 h-16 mb-4" />

    <span
      class="text-ldsa-text-green text-[0.938rem] font-bold tracking-[1.5%]"
    >
      {{ title }}
    </span>
  </NuxtLink>
</template>
