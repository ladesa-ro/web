<script lang="ts" setup>
import IconLocale from '../icons/IconLocale.vue';

export type EventLocaleProps = {
  locale?: string;
};

defineProps<EventLocaleProps>();
</script>

<template>
  <div
    class="ui-event-locale u-flex u-justify-center u-items-center u-rounded-lg u-p-2 u-gap-2"
  >
    <IconLocale class="ui-event-locale__icon" />

    <p class="u-text-sm">{{ locale || 'Sem local definido' }}</p>
  </div>
</template>
