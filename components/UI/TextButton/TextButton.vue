<script setup lang="ts">
//

type Props = {
  text?: string;
  showBackground?: boolean;
};

const props = defineProps<Props>();

//
</script>

<template>
  <button
    class="flex w-full h-[48px] justify-center items-center cursor-pointer rounded-lg"
    :class="{
      'bg-[#118D3B] text-white': props.showBackground,
      'border-[#9ab69e] border-solid border-2 bg-white':
        props.showBackground !== true,
    }"
  >
    <p class="font-semibold text-center text-sm sm:text-[16px]">
      {{ props.text }}
    </p>
  </button>
</template>
