<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';

type Props = {
  notificationsButtonEl: HTMLElement | null;
};

const props = defineProps<Props>();

const bubbleEl = ref(null);

const boundingActivator = useElementBounding(props.notificationsButtonEl);

const boundingBubble = useElementBounding(bubbleEl);

const computedPinLeft = computed(() => {
  return (
    boundingActivator.x.value +
    boundingActivator.width.value / 2 -
    boundingBubble.x.value
  );
});
</script>

<template>
  <div ref="bubbleEl" class="chat-bubble bg-ldsa-bg shadow-lg mt-2">
    <div
      class="pin"
      :style="{
        left: `${computedPinLeft}px`,
      }"
    />

    <div class="flex flex-col">
      <div class="py-2 px-4">Novo evento gerado.</div>
      <hr />

      <div class="py-2 px-4">O evento IFRO Party foi agendado.</div>

      <hr />

      <div class="py-2 px-4">Novo calendário cadastrado.</div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.chat-bubble {
  position: relative;
  width: 35rem;
  max-width: 90vw;
  border: 0.125rem;
  border-radius: 0.625rem;
  font-weight: bold;
  @apply bg-ldsa-bg border-solid border-ldsa-green-1 text-ldsa-text-default;
}

.pin {
  width: 1.25rem;
  position: absolute;
  border: 0.635rem solid transparent;
  top: -1.25rem;
  transform: translateX(-0.75rem);
  content: '';
  border-bottom: 0.635rem solid;
  @apply border-b-ldsa-green-1;
}
</style>
