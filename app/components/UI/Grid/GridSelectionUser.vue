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
  <v-container>
    <v-row v-if="items">
      <v-col v-for="item in items" cols="12" class="px-0">
        <slot name="item" v-bind="{ item: item as T }" />
      </v-col>
    </v-row>
  </v-container>
</template>
