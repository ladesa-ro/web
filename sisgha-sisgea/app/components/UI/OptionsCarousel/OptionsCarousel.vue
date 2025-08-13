<script setup lang="ts">
import type { Item } from '~/composables/useOptionItems';

type Props = {
  /** List of items */
  items: Item[];

  /** The index selected when the component initializes */
  selectedItemDefaultIndex?: number;

  /** Toggles padding */
  toggleButtonsPadding?: string;
};

const {
  items: itemsProps,
  selectedItemDefaultIndex = 0,
  toggleButtonsPadding = '0',
} = defineProps<Props>();

const items = getParsedItems(itemsProps);

const togglePadding = {
  padding: toggleButtonsPadding,
};

//

const selectedItem = defineModel<Item>();

//

let selectedIndex = ref(selectedItemDefaultIndex);

// logic based in modular math!
function navigate(num: number) {
  selectedIndex.value =
    (selectedIndex.value + num + items.length) % items.length;

  selectedItem.value = items[selectedIndex.value]?.value;
}

//

onMounted(() => {
  selectedItem.value = items[selectedIndex.value]?.value;
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <button :style="togglePadding" @pointerdown="navigate(-1)">
      <slot name="toggleButton" />
    </button>

    <span class="truncate">{{ items[selectedIndex]?.label }}</span>

    <button
      :style="togglePadding"
      class="rotate-180"
      @pointerdown="navigate(1)"
    >
      <slot name="toggleButton" />
    </button>
  </div>
</template>
