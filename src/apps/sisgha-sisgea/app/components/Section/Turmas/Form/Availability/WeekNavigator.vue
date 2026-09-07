<script lang="ts" setup>
defineProps<{
  weekLabel: string;
  hideButtons?: boolean;
}>();

defineEmits<{
  prev: [];
  next: [];
}>();
</script>

<template>
  <div class="u-flex u-items-center u-justify-between u-w-full u-gap-2">
    <UIButtonDefaultSquare
      v-if="!hideButtons"
      type="button"
      class="week-nav-button"
      @click="$emit('prev')"
    >
      <IconsArrow class="week-nav-icon" />
    </UIButtonDefaultSquare>

    <span class="week-label u-font-semibold u-text-center u-flex-1">
      {{ weekLabel }}
    </span>

    <UIButtonDefaultSquare
      v-if="!hideButtons"
      type="button"
      class="week-nav-button week-nav-button--next"
      @click="$emit('next')"
    >
      <IconsArrow class="week-nav-icon" />
    </UIButtonDefaultSquare>
  </div>
</template>

<style scoped>
.week-nav-button {
  border: 2px solid var(--ladesa-grey-color);
  background-color: transparent !important;
}

.week-nav-button--next {
  transform: rotate(180deg);
}

.week-label {
  color: var(--ladesa-text-default-color);
}

.week-nav-icon {
  color: var(--ladesa-green-1-color);
}
</style>
