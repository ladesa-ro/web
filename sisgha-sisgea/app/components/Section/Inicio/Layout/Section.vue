<script lang="ts" setup>
defineProps<{
  title: string
}>();
</script>

<template>
  <div class="mb-5">
    <h2 class="font-medium mb-3 text-[18px]">{{ title }}</h2>
    <div class="grid grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))] gap-4">
      <slot />
    </div>
    <hr class="divider flex-grow pt-5 border-t border-ldsa-grey" />
  </div>
</template>