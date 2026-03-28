<script setup lang="ts">
type Props = { open?: boolean; disabled?: boolean };
defineProps<Props>();
</script>

<template>
  <IconsArrow
    class="mr-1 p-[0.063rem] transition-transform duration-250"
    :class="[
      open ? 'rotate-90' : '-rotate-90',
      disabled ? 'text-ldsa-grey' : 'text-ldsa-text-green',
    ]"
  />
</template>
