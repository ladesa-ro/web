<script lang="ts" setup>
const props = defineProps<{ locale?: string }>();
</script>

<template>
  <div
    class="flex w-max border-2 border-ldsa-grey justify-center items-center rounded-lg p-2 gap-2 mt-2"
  >
    <div class="flex h-3 w-3">
      <IconsIconLocale />
    </div>

    <p class="text-xs">{{ props.locale || 'Sem local definido' }}</p>
  </div>
</template>
