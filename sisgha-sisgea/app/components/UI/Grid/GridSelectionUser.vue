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
  <v-container>
    <v-row v-if="items">
      <v-col v-for="item in items" class="px-0" cols="12">
        <slot name="item" v-bind="{ item: item as T }" />
      </v-col>
    </v-row>
  </v-container>
</template>
