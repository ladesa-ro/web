<script setup lang="ts">
type Props = {
  initialHour: string;
  endHour: string;
};
defineProps<Props>();

const divider = ' - ';
</script>

<template>
  <span class="text-center font-[500]">
    {{ initialHour }}
    {{ divider }}
    {{ endHour }}
  </span>
</template>
