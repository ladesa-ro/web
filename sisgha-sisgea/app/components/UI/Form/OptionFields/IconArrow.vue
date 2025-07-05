<script setup lang="ts">
type Props = { open: boolean };
defineProps<Props>();
</script>

<template>
  <IconsArrow
    class="mr-1 p-[0.063rem] text-ldsa-text-green transition-transform duration-[250ms]"
    :class="open ? 'rotate-90' : '-rotate-90'"
  />
</template>
