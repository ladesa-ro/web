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

const square = ref<HTMLDivElement>();

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
  <div ref="square" :class="{ active: active }" class="day-square">
    <p class="day-week">{{ dayWeek }}</p>
    <p>{{ dayMonth }}</p>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day-square {
  @apply flex-1 flex flex-col justify-center items-center;
  @apply rounded-[0.625rem] border-2 border-ldsa-green-1;
  @apply min-w-20 cursor-pointer font-[600] text-ldsa-text-green;
  @apply min-[900px]:p-4 min-[900px]:max-w-28 min-[900px]:max-h-28 min-[900px]:gap-2;
  @apply max-[900px]:p-3 max-[900px]:max-w-20 max-[900px]:gap-1;
}

.day-week {
  @apply p-0 pb-[0.313rem] border-b-2 border-b-ldsa-green-1;
}

/* --- */

.active {
  @apply bg-ldsa-green-1 text-ldsa-white;
}

div.active p:first-child {
  @apply border-b-ldsa-white;
}
</style>
