<script lang="ts" setup>
type Props = {
  text?: string;
  showBackground?: boolean;
};
const props = defineProps<Props>();
</script>

<template>
  <button
    :class="{
      'bg-ldsa-green-1 text-ldsa-white': props.showBackground,
      'border-x-ldsa-grey border-solid border-2 bg-ldsa-bg':
        props.showBackground !== true,
    }"
    class="flex w-full h-[48px] justify-center items-center cursor-pointer rounded-lg"
  >
    <p class="font-semibold text-center text-sm sm:text-[16px]">
      {{ props.text }}
    </p>
  </button>
</template>
