<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core';

type Props = { notificationsButtonEl: HTMLElement | null };

const { notificationsButtonEl } = defineProps<Props>();

//

const bubbleEl = ref(null);

const boundingActivator = useElementBounding(notificationsButtonEl);

const boundingBubble = useElementBounding(bubbleEl);

const computedPinLeft = computed(() => {
  return (
    boundingActivator.x.value +
    boundingActivator.width.value / 2 -
    boundingBubble.x.value
  );
});

//

const selectedDay = useSelectedDay();
</script>

<template>
  <!-- chat bubble -->
  <div
    ref="bubbleEl"
    class="relative max-w-[90vw] shadow-xl border-2 border-ldsa-green-1 rounded-md bg-ldsa-bg"
  >
    <!-- pin -->
    <div
      :style="{ left: `${computedPinLeft}px` }"
      class="content-none absolute -top-5 w-5 border-solid border-[0.635rem] border-transparent border-b-[0.635rem] border-b-ldsa-green-1 -translate-x-3"
    />

    <SectionCalendarioMonth
      :events="[]"
      :month="selectedDay.month()"
      :select-week="false"
      :steps="[]"
      :toggle-month="false"
      :year="selectedDay.year()"
    />
  </div>
</template>
