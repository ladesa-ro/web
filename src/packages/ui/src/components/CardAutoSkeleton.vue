<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core';
import { ref, watch } from 'vue';
import CardSkeleton from './CardSkeleton.vue';

const _ARBITRARY_UI_CARD_SKELETON_INITIAL_HEIGHT = `18.15rem`;

//

type Props = {
  skeleton?: boolean;
  skeletonInitialHeight?: string;
};

const { skeleton: skeletonProps, skeletonInitialHeight } = defineProps<Props>();

//

const skeleton = skeletonProps ?? false;

const cardElRef = ref(null);

const { height: cardElBoundingHeight } = useElementBounding(cardElRef, {
  immediate: false,
});

const skeletonHeight = ref(
  skeletonInitialHeight ?? _ARBITRARY_UI_CARD_SKELETON_INITIAL_HEIGHT
);

watch([cardElBoundingHeight], ([height]) => {
  if (height) {
    skeletonHeight.value = `${height}px`;
  }
});
</script>

<template>
  <CardSkeleton v-if="skeleton" :style="{ height: skeletonHeight }" />
  <div v-else ref="cardElRef">
    <slot />
  </div>
</template>
