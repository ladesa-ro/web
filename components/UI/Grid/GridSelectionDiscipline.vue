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
      <v-col cols="12" class="px-0" v-for="item in items">
        <slot name="item" v-bind="{ item }"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
