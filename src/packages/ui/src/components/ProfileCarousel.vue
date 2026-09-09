<script lang="ts" setup>
export type ProfileCarouselProps = {
  items: any[];
};
const { items } = defineProps<ProfileCarouselProps>();
</script>

<template>
  <div class="ui-carousel">
    <div v-for="(item, index) in items" :key="index" class="ui-card">
      <slot name="item" :item="item" />
    </div>
  </div>
</template>
