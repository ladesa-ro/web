<script lang="ts" setup>
export type ScheduleQueryButtonProps = {
  color?: string;
  text?: string;
};

const { color = 'var(--ladesa-grey-color)', text = '' } = defineProps<ScheduleQueryButtonProps>();

const buttonColor = { '--color': color };
</script>

<template>
    <button
    :style="buttonColor"
    class="ui-schedule-query-button u-flex u-items-center u-justify-center u-gap-1-5 u-px-2"
  >
    <span v-if="text !== ''" class="u-font-semibold u-text-sm">{{ text }}</span>

    <span v-if="$slots['default']" class="u-shrink-0">
      <slot />
    </span>
  </button>
</template>
