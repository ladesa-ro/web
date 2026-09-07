<script setup lang="ts">
import { type OptionItem, OptionsCarousel, type OptionsCarouselProps } from '@ladesa-ro/web.ui';

defineProps<OptionsCarouselProps>();
const selectedItem = defineModel<OptionItem>();
</script>

<template>
  <OptionsCarousel
    v-model="selectedItem"
    :items="items"
    :selected-item-default-index="selectedItemDefaultIndex"
    :toggle-buttons-padding="toggleButtonsPadding"
    :omit-toggles-when-items-length-is-one="omitTogglesWhenItemsLengthIsOne"
  >
    <template #toggleButton>
      <slot name="toggleButton" />
    </template>
  </OptionsCarousel>
</template>
