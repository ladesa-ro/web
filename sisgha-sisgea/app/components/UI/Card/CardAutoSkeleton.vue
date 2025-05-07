<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core';

const _ARBITRARY_UI_CARD_SKELETON_INITIAL_HEIGHT = `18.15rem`;

//

const $emit = defineEmits(['edit']);

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
  <UICardSkeleton v-if="skeleton" :style="{ height: skeletonHeight }" />
  <div v-else ref="cardElRef">
    <slot />
  </div>
</template>
