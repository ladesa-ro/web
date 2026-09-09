<script lang="ts" setup>
import { ProfileCarousel, type ProfileCarouselProps } from '@ladesa-ro/web.ui';

defineProps<ProfileCarouselProps>();
</script>

<template>
  <ProfileCarousel :items="items">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </ProfileCarousel>
</template>
