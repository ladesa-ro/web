<script setup lang="ts">
import { useDebounceFn, useWindowSize } from '@vueuse/core';

type Props = {
  active: boolean;
  dayWeek: string;
  dayMonth: string;
};
const props = defineProps<Props>();

const square = ref<HTMLDivElement>();

const { active } = toRefs(props);

const scrollIntoViewIfActive = () => {
  const isActive = active.value;
  const squareElement = square.value;

  if (isActive && squareElement) {
    squareElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
};

watch(
  [active, square],
  () => {
    scrollIntoViewIfActive();
  },
  { once: true }
);

const debouncedScrollIntoView = useDebounceFn(scrollIntoViewIfActive, 150);

const { width, height } = useWindowSize();
watch([width, height], debouncedScrollIntoView);
</script>

<template>
  <div
    ref="square"
    class="flex-1 flex flex-col cursor-pointer justify-center items-center rounded-[10px] border-2 border-[#118D3B] min-w-20 min-[900px]:p-4 min-[900px]:max-w-28 min-[900px]:max-h-28 min-[900px]:gap-2 max-[900px]:p-3 max-[900px]:max-w-20 max-[900px]:gap-1"
    :class="{ active: active }"
  >
    <p
      class="border-b-2 border-b-[#118D3B] p-0 pb-[5px] font-[600] text-[#118D3B]"
    >
      {{ dayWeek }}
    </p>
    <p class="font-[600] text-[#118D3B]">
      {{ dayMonth }}
    </p>
  </div>
</template>

<style scoped>
.active {
  background-color: #118d3b;
  color: white;
}

div.active p {
  color: white;
}

div.active p:first-child {
  border-bottom-color: white;
}
</style>
