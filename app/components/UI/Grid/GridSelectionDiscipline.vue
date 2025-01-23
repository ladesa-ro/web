<script setup lang="ts" generic="T">
type Props = {
  items: T[];
};
const { items } = defineProps<Props>();

//

type Slots = {
  item(props: { item: T }): any;
};
const slots = defineSlots<Slots>();
</script>

<template>
  <section v-if="items" class="selection-discipline">
    <div v-for="item in items" class="px-0 w-full">
      <slot name="item" v-bind="{ item: item as T }" />
    </div>
  </section>
</template>

<style scoped>
.selection-discipline {
  @apply flex flex-col gap-4 overflow-y-auto overflow-x-hidden mr-2;
}
</style>
