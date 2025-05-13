<script setup lang="ts">
type Props = {
  /** List of items */
  items: Array<any>;

  /** The index selected when the component initializes */
  selectedItemDefaultIndex?: number;

  /** Toggles padding */
  toggleButtonsPadding?: string;
};

const {
  items,
  selectedItemDefaultIndex = 0,
  toggleButtonsPadding = '0',
} = defineProps<Props>();

const togglePadding = {
  padding: toggleButtonsPadding,
};

//

let selectedIndex = ref(selectedItemDefaultIndex);

// logic based in modular math!
function navigate(num: number) {
  selectedIndex.value =
    (selectedIndex.value + num + items.length) % items.length;
}

//

const selectedItem = defineModel<any>({
  required: false,
  default: '',
});
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <button :style="togglePadding" @click="navigate(-1)">
      <slot name="toggleButton" />
    </button>

    <span class="truncate">{{ items[selectedIndex] }}</span>

    <button :style="togglePadding" class="rotate-180" @click="navigate(1)">
      <slot name="toggleButton" />
    </button>
  </div>
</template>
