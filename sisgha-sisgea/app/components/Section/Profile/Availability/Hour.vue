<script lang="ts" setup>
type Props = {
  initialHour: string;
  endHour: string;
};
defineProps<Props>();

const divider = ' - ';
</script>

<template>
  <span class="text-center font-medium text-sm xl:font-base min-w-max">
    {{ initialHour }}
    {{ divider }}
    {{ endHour }}
  </span>
</template>
