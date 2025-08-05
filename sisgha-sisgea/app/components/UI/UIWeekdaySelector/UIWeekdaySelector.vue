<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Item } from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  selectedItemDefaultIndex?: number;
};

const { items: itemsProps, selectedItemDefaultIndex = 0 } = defineProps<Props>();

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
      @click="selectItem(index)"
      class="flex-1 text-center font-semibold py-4 rounded-xl transition-all duration-200"
      :class="{
        'bg-ldsa-green-1 text-white': selectedIndex === index,
        'border-2 border-ldsa-green-1 hover:bg-ldsa-green-1/20 text-ldsa-green-1': selectedIndex !== index
      }"
    >
      {{ item.label.slice(0, 3).toLowerCase() }}
    </button>
  </div>
</template>
