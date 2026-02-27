<script setup lang="ts">
const { to = './', text = '' } = defineProps<{ to?: string; text: string }>();
</script>

<template>
  <span class="flex items-center gap-4 font-semibold text-lg">
    <NuxtLink
      :to="to"
      class="hover:shadow-[0_0_0_5px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_0_0_5px_rgb(255,255,255,0.04)] hover:bg-ldsa-grey/15 flex items-center my-auto p-1 h-max rounded-full"
    >
      <span class="flex items-center justify-center">
        <IconsArrowAlt class="w-5.5 text-ldsa-grey" />
      </span>
    </NuxtLink>

    <UITitle class="default text" :text="text" />
  </span>
</template>
