<script lang="ts" setup>
import { useDebounceFn, useWindowSize } from '@vueuse/core';

type Props = {
  active: boolean;
  dayWeek: string;
  dayMonth: string;
};
const props = defineProps<Props>();
const { active } = toRefs(props);

//

const square = ref<HTMLButtonElement>();

//scrollIntoView in mobile
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

onMounted(() => {
  scrollIntoViewIfActive();
});

const debouncedScrollIntoView = useDebounceFn(scrollIntoViewIfActive, 150);

const { width, height } = useWindowSize();
watch([width, height], debouncedScrollIntoView);
</script>

<template>
  <button ref="square" :class="{ active: active }" class="day-square">
    <p class="day-week">{{ dayWeek }}</p>
    <p>{{ dayMonth }}</p>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.day-square {
  @apply w-full flex flex-col justify-center items-center gap-1 lg:gap-2;
  @apply min-w-20 max-w-16 lg:max-w-28 lg:max-h-28 p-3 lg:p-4;
  @apply border-2 border-ldsa-green-1 rounded-[0.625rem] ;
  @apply text-sm lg:text-base font-semibold text-ldsa-text-green;
}

.day-week {
  @apply p-0 pb-[0.313rem] border-b-2 border-b-ldsa-green-1;
}

/* --- */

.active {
  @apply bg-ldsa-green-1 text-ldsa-white;
}

.active .day-week {
  @apply border-b-ldsa-white;
}
</style>
