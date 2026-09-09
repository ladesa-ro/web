<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getParsedOptionItems, type OptionItem } from './option-item';

export type OptionsCarouselProps = {
  items: OptionItem[];
  selectedItemDefaultIndex?: number;
  toggleButtonsPadding?: string;
  omitTogglesWhenItemsLengthIsOne?: boolean;
};

const {
  items: itemsProps,
  selectedItemDefaultIndex = 0,
  toggleButtonsPadding = '0',
  omitTogglesWhenItemsLengthIsOne = false,
} = defineProps<OptionsCarouselProps>();

const items = getParsedOptionItems(itemsProps);

const togglePadding = {
  padding: toggleButtonsPadding,
};

const selectedItem = defineModel<OptionItem>();

const selectedIndex = ref(selectedItemDefaultIndex);

function navigate(num: number) {
  selectedIndex.value =
    (selectedIndex.value + num + items.length) % items.length;

  selectedItem.value = items[selectedIndex.value]?.value;
}

onMounted(() => {
  selectedItem.value = items[selectedIndex.value]?.value;
});
</script>

<template>
  <div class="ui-options-carousel">
    <button
      v-if="omitTogglesWhenItemsLengthIsOne ? items.length > 1 : true"
      class="ui-options-carousel__toggle"
      :disabled="items.length === 1"
      :style="togglePadding"
      @click="navigate(-1)"
    >
      <slot name="toggleButton" />
    </button>

    <span class="ui-options-carousel__label">{{
      items[selectedIndex]?.label
    }}</span>

    <button
      v-if="omitTogglesWhenItemsLengthIsOne ? items.length > 1 : true"
      class="ui-options-carousel__toggle ui-options-carousel__toggle--next"
      :disabled="items.length === 1"
      :style="togglePadding"
      @click="navigate(1)"
    >
      <slot name="toggleButton" />
    </button>
  </div>
</template>
