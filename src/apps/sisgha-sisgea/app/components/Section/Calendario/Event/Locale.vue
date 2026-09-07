<script lang="ts" setup>
defineProps<{ locale?: string }>();
</script>

<template>
  <div
    class="u-flex u-justify-center u-items-center u-rounded-lg u-p-2 u-gap-2 event-locale"
  >
    <IconsIconLocale class="event-locale__icon" />

    <p class="u-text-sm">{{ locale || 'Sem local definido' }}</p>
  </div>
</template>

<style scoped>
.event-locale {
  width: max-content;
  border: 2px solid var(--ladesa-grey-color);
  margin-top: var(--ui-space-1);
}

.event-locale__icon {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
