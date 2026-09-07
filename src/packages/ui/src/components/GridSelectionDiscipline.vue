<script generic="T" lang="ts" setup>
const { items } = defineProps<{ items: T[] }>();

defineSlots<{
  item(props: { item: T }): any;
}>();
</script>

<template>
  <section v-if="items" class="ui-grid-selection-discipline">
    <div v-for="item in items" class="ui-grid-selection-discipline__item">
      <slot name="item" v-bind="{ item: item as T }" />
    </div>
  </section>
</template>
