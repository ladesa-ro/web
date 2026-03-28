<script lang="ts" setup>
defineProps<{ locale?: string }>();
</script>

<template>
  <div
    class="flex w-max border-2 border-ldsa-grey justify-center items-center rounded-lg p-2 gap-2 mt-1"
  >
    <IconsIconLocale class="h-3 w-3" />

    <p class="text-sm">{{ locale || 'Sem local definido' }}</p>
  </div>
</template>
