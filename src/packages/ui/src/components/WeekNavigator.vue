<script lang="ts" setup>
import DefaultSquare from './DefaultSquare.vue';
import IconArrow from '../icons/Arrow/Arrow.vue';

export type WeekNavigatorProps = {
  weekLabel: string;
  hideButtons?: boolean;
};

defineProps<WeekNavigatorProps>();

defineEmits<{
  prev: [];
  next: [];
}>();
</script>

<template>
  <div class="u-flex u-items-center u-justify-between u-w-full u-gap-2">
    <DefaultSquare
      v-if="!hideButtons"
      type="button"
      class="ui-week-navigator__button"
      @click="$emit('prev')"
    >
      <IconArrow class="ui-week-navigator__icon" />
    </DefaultSquare>

    <span
      class="ui-week-navigator__label u-font-semibold u-text-center u-flex-1"
    >
      {{ weekLabel }}
    </span>

    <DefaultSquare
      v-if="!hideButtons"
      type="button"
      class="ui-week-navigator__button ui-week-navigator__button--next"
      @click="$emit('next')"
    >
      <IconArrow class="ui-week-navigator__icon" />
    </DefaultSquare>
  </div>
</template>
