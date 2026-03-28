<script lang="ts" setup>
type Props = {
  icon: Component | (HTMLElement & SVGElement);
  title: string;
};

defineProps<Props>();
</script>

<template>
  <section class="border-card p-3.5 lg:p-4 xl:p-5">
    <!-- section title -->
    <p class="flex items-center gap-2.5 mb-4 font-semibold">
      <component :is="icon" class="w-4.5 md:w-5.5" />
      <span class="text-sm md:text-base"> {{ title }} </span>
    </p>

    <!-- section content -->
    <slot />
  </section>
</template>
