<script generic="T extends { id: string }" lang="ts" setup>
import { toRef } from 'vue';

const props = defineProps<{
  items: T[];
}>();

const items = toRef(props, 'items');

defineSlots<{
  item(props: { item: T }): any;
}>();
</script>

<template>
  <div class="ui-grid-selection-user">
    <div v-if="items" class="ui-grid-selection-user__items">
      <template v-for="item in items" :key="item.id">
        <slot name="item" v-bind="{ item: item as T }" />
      </template>
    </div>
  </div>
</template>
