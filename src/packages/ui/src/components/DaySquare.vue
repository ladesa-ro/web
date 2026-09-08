<script lang="ts" setup>
export type DaySquareProps = {
  selected: boolean;
  dayWeek: string;
  dayMonth: string;
};

defineProps<DaySquareProps>();
</script>

<template>
  <button
    type="button"
    class="ui-day-square"
    :class="{ 'ui-day-square--selected': selected }"
  >
    <p class="ui-day-square__week">
      <span class="ui-day-square__week-full">{{ dayWeek }}</span>
      <span class="ui-day-square__week-short">{{ dayWeek.slice(0, 3) }}</span>
    </p>

    <p>{{ dayMonth }}</p>
  </button>
</template>
