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
  <div ref="bubbleEl" class="chat-bubble bg-white shadow-lg mt-2">
    <div
      class="pin"
      :style="{
        left: `${computedPinLeft}px`,
      }"
    ></div>

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
.chat-bubble {
  font-weight: bold;
  background-color: #ffffff;
  border: 0.125rem solid #118d3b;
  max-width: 90vw;
  width: 35rem;
  border-radius: 0.625rem;
  position: relative;
}

.pin {
  content: '';
  position: absolute;
  border: 0.635rem solid transparent;
  border-bottom: 0.635rem solid #118d3b;
  top: -1.25rem;
  transform: translateX(-0.75rem);
  width: 1.25rem;
}
</style>
