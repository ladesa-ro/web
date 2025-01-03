<script setup lang="ts">
type Props = {
  initialHour: string;
  endHour: string;
}
defineProps<Props>();

const divider: string = ' - ';
</script>

<template>
  <span class="font-[500]">
    {{ initialHour }}
    {{ divider }}
    {{ endHour }}
  </span>
</template>