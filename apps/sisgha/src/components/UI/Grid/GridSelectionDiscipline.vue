<script setup lang="ts" generic="T">
const props = defineProps<{
  items: T[];
}>();

const items = toRef(props, 'items');

const slots = defineSlots<{
  item(props: { item: T }): any;
}>();
</script>

<template>
  <div
    v-if="items"
    class="flex flex-col gap-4 max-h-[26rem] overflow-y-auto overflow-x-hidden -mr-4"
  >
    <div class="px-0 mr-4" v-for="item in items">
      <slot name="item" v-bind="{ item: item as T }"></slot>
    </div>
  </div>
</template>
