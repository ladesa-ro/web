<script setup lang="ts">
import type { Item } from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  selectedItemDefaultIndex?: number;

  mode?: 'default' | 'compact';
};

const {
  items: itemsProps,
  selectedItemDefaultIndex = 0,
  mode = 'default',
} = defineProps<Props>();

const items = getParsedItems(itemsProps);
const selectedItem = defineModel<Item>();
const selectedIndex = ref(selectedItemDefaultIndex);

function selectItem(index: number) {
  selectedIndex.value = index;
  selectedItem.value = items[index]?.value;
}

onMounted(() => {
  selectedItem.value = items[selectedIndex.value]?.value;
});
</script>

<template>
  <div class="flex justify-between gap-2 w-full">
    <button
      v-for="(item, index) in items"
      :key="index"
      class="flex-1 text-center font-semibold py-4 px-2 rounded-xl border-2 border-ldsa-green-1"
      :class="[
        {
          'bg-ldsa-green-1 text-white': selectedIndex === index,
          'text-ldsa-text-green': selectedIndex !== index,
        },
        mode === 'compact' ? 'text-sm !py-2' : '',
      ]"
      type="button"
      @click="selectItem(index)"
    >
      {{ item.label.slice(0, 3) }}
    </button>
  </div>
</template>
