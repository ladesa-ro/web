<script generic="T" lang="ts" setup>
const props = defineProps<{
  items: T[];
}>();

const items = toRef(props, 'items');

const slots = defineSlots<{
  item(props: { item: T }): any;
}>();
</script>

<template>
  <div class="px-4">
    <div v-if="items" class="grid grid-cols-1 gap-4">
      <template v-for="item in items" :key="item.id">
        <slot name="item" v-bind="{ item: item as T }" />
      </template>
    </div>
  </div>
</template>
