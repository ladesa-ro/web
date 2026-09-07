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
      <span class="day-week-full">
        {{ dayWeek }}
      </span>
      <span class="day-week-short">
        {{ dayWeek.slice(0, 3) }}
      </span>
    </p>
    <p>{{ dayMonth }}</p>
  </button>
</template>

<style scoped>
.day-square {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--ui-space-1);
  overflow: hidden;
  min-width: 2.5rem;
  padding: var(--ui-space-1);
  padding-block: 0.625rem;
  border: 2px solid var(--ladesa-green-1-color);
  border-radius: 0.625rem;
  font-size: 0.75rem;
  font-weight: var(--ui-font-weight-semibold);
  color: var(--ladesa-text-green-color);
}

@media (min-width: 462px) {
  .day-square {
    padding: var(--ui-space-2);
  }
}

@media (min-width: 640px) {
  .day-square {
    padding: var(--ui-space-3);
    font-size: 0.875rem;
  }
}

@media (min-width: 1024px) {
  .day-square {
    gap: var(--ui-space-2);
    max-width: 7rem;
    max-height: 7rem;
    padding: var(--ui-space-4);
    font-size: 1rem;
  }
}

.day-week {
  padding: 0;
  padding-bottom: 0.313rem;
  border-bottom: 2px solid var(--ladesa-green-1-color);
}

.day-week-full {
  display: none;
}

.day-week-short {
  display: inline;
}

@media (min-width: 820px) {
  .day-week-full {
    display: inline;
  }

  .day-week-short {
    display: none;
  }
}

.selected {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.selected .day-week {
  border-bottom-color: var(--ladesa-white-color);
}
</style>
