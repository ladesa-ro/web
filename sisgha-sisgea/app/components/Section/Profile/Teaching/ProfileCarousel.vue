<script setup lang="ts">
type Props = {
  items: any[];
};
const { items } = defineProps<Props>();
</script>

<template>
  <div class="carousel">
    <div v-for="(item, index) in items" :key="index" class="card">
      <slot name="item" :item="item" />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  margin: 1rem auto;
  overflow-x: auto;
  display: flex;
  gap: 1rem;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-marker-group: after;
  anchor-name: --carousel;
}

.carousel::scroll-marker-group {
  display: flex;
  justify-content: center;
  gap: 0.3em;
}

.card::scroll-marker {
  content: '';
  height: .3em;
  width: .9em;
  background-color: var(--ladesa-grey-color);
  border-radius: .5rem;
}

.card::scroll-marker:target-current {
  background-color: var(--ladesa-text-default-color);
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel::scroll-button(right),
.carousel::scroll-button(left) {
  content: '>';
  border: none;
  font-family: Consolas;
  background: none;
  font-size: 1.5rem;
  color: var(--ladesa-text-default-color);
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  position-anchor: --carousel;
  position-area: right center;
  translate: -20%;
}

.carousel::scroll-button(left) {
  content: '<';
  position-area: left center;
  translate: 20%;
}

.carousel::scroll-button(right):disabled,
.carousel::scroll-button(left):disabled {
  opacity: 0.5;
  cursor: auto;
}

.card {
  scroll-snap-align: start;
  flex: 0 0 20em;
  aspect-ratio: 5 / 3;
  border-radius: 0.5rem;
  text-align: center;
  align-content: center;
}

@media (max-width: 500px) {
  .card {
    flex: 0 0 100%;
  }
}
</style>
