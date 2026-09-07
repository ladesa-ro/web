<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getParsedOptionItems, type OptionItem } from './option-item';

export type WeekDaySelectorProps = {
  items: OptionItem[];
  selectedItemDefaultIndex?: number;
  mode?: 'default' | 'compact';
};

const {
  items: itemsProps,
  selectedItemDefaultIndex = 0,
  mode = 'default',
} = defineProps<WeekDaySelectorProps>();

const items = getParsedOptionItems(itemsProps);
const selectedItem = defineModel<OptionItem>();
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
  <div class="ui-week-day-selector">
    <button
      v-for="(item, index) in items"
      :key="index"
      class="ui-week-day-selector__button"
      :class="[
        selectedIndex === index
          ? 'ui-week-day-selector__button--selected'
          : 'ui-week-day-selector__button--unselected',
        mode === 'compact' ? 'ui-week-day-selector__button--compact' : '',
      ]"
      type="button"
      @click="selectItem(index)"
    >
      {{ item.label.slice(0, 3) }}
    </button>
  </div>
</template>
