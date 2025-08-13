<script lang="ts" setup>
type Props = {
  initialHour: string;
  endHour: string;
};
defineProps<Props>();

const DIVIDER = ' - ';
</script>

<template>
  <span class="text-center font-medium text-sm xl:font-base min-w-max nunito">
    {{ initialHour }}
    {{ DIVIDER }}
    {{ endHour }}
  </span>
</template>
