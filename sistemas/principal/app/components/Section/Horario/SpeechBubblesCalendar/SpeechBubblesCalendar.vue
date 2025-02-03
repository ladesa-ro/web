<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';

const props = defineProps<{ notificationsButtonEl: HTMLElement | null }>();
const bubbleEl = ref(null);

const boundingActivator = useElementBounding(props.notificationsButtonEl);

const boundingBubble = useElementBounding(bubbleEl);

const computedPinLeft = computed(() => {
  return (
    boundingActivator.x.value +
    boundingActivator.width.value / 2 -
    boundingBubble.x.value
  );
});

const selectedDay = useSelectedDay();
</script>

<template>
  <div ref="bubbleEl" class="chat-bubble bg-ldsa-bg shadow-lg mt-2">
    <div class="pin" :style="{ left: `${computedPinLeft}px` }" />

    <SectionCalendarioMonth
      :year="selectedDay.year()"
      :month="selectedDay.month()"
      :toggle-month="false"
      :select-week="false"
      :steps="[]"
      :events="[]"
      class="mx-0"
    />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.chat-bubble {
  font-weight: bold;
  @apply bg-ldsa-bg;
  @apply border-[0.125rem] border-ldsa-green-1;
  max-width: 90vw;
  border-radius: 0.625rem;
  position: relative;
}

.pin {
  content: '';
  position: absolute;
  border: 0.635rem solid transparent;
  @apply border-b-[0.635rem] border-b-ldsa-green-1;
  top: -1.25rem;
  transform: translateX(-0.75rem);
  width: 1.25rem;
}
</style>
