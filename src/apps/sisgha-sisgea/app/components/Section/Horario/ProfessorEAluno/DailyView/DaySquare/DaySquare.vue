<script lang="ts" setup>
type Props = {
  selected: boolean;
  dayWeek: string;
  dayMonth: string;
};
defineProps<Props>();
</script>

<template>
  <button :class="{ selected }" class="day-square">
    <p class="day-week">
      <span class="max-[820px]:hidden min-[820px]:inline">
        {{ dayWeek }}
      </span>
      <span class="min-[820px]:hidden max-[820px]:inline">
        {{ dayWeek.slice(0, 3) }}
      </span>
    </p>
    <p>{{ dayMonth }}</p>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.day-square {
  @apply w-full flex flex-col justify-center items-center gap-1 lg:gap-2 overflow-hidden;
  @apply min-w-10 lg:max-w-28 lg:max-h-28 p-1 py-2.5 min-[462px]:p-2 sm:p-3 lg:p-4;
  @apply border-2 border-ldsa-green-1 rounded-[0.625rem];
  @apply text-xs sm:text-sm lg:text-base font-semibold text-ldsa-text-green;
}

.day-week {
  @apply p-0 pb-[0.313rem] border-b-2 border-b-ldsa-green-1;
}

.selected {
  @apply bg-ldsa-green-1 text-ldsa-white;
}

.selected .day-week {
  @apply border-b-ldsa-white;
}
</style>
