<script setup lang="ts">
type Props = {
  icon: Component | (HTMLElement & SVGElement);
  title: string;
};

type Slots = {
  default: () => any;
};

defineProps<Props>();
defineSlots<Slots>();
</script>

<template>
  <section class="border-card p-5">
    <p class="section-title">
      <span class="icon">
        <component :is="icon" />
      </span>
      {{ title }}
    </p>

    <slot />
    <!-- content -->
  </section>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.section-title {
  @apply flex items-center gap-[0.625rem];
  @apply mb-5 font-[600];
}

.icon {
  @apply w-[1.375rem] h-[1.375rem];
}
</style>
