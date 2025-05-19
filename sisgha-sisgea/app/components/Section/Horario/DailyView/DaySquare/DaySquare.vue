<script lang="ts" setup>
import { useDebounceFn, useMediaQuery, useWindowSize } from '@vueuse/core';

type Props = {
  selected: boolean;
  dayWeek: string;
  dayMonth: string;
};
const { selected } = defineProps<Props>();

//

const square = ref<HTMLButtonElement>();

//scrollIntoView in mobile
const scrollIntoViewIfActive = () => {
  const squareElement = square.value;

  if (selected && squareElement) {
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

//

const screenSmallerThan820 = useMediaQuery('(max-width: 820px)');
</script>

<template>
  <button ref="square" :class="{ selected: selected }" class="day-square">
    <p class="day-week">
      {{ screenSmallerThan820 ? dayWeek.slice(0, 3) : dayWeek }}
    </p>
    <p>{{ dayMonth }}</p>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day-square {
  @apply w-full flex flex-col justify-center items-center gap-1 lg:gap-2 overflow-hidden;
  @apply min-w-14 lg:max-w-28 lg:max-h-28 p-1 py-2.5 min-[462px]:p-2 sm:p-3 lg:p-4;
  @apply border-2 border-ldsa-green-1 rounded-[0.625rem];
  @apply text-xs sm:text-sm lg:text-base font-semibold text-ldsa-text-green;
}

.day-week {
  @apply p-0 pb-[0.313rem] border-b-2 border-b-ldsa-green-1;
}

/* --- */

.selected {
  @apply bg-ldsa-green-1 text-ldsa-white;
}

.selected .day-week {
  @apply border-b-ldsa-white;
}
</style>
