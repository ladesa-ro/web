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
      <span class="w-[1.375rem] h-[1.375rem]">
        <component :is="icon" />
      </span>
      {{ title }}
    </p>

    <!-- content -->
    <slot />
  </section>
</template>

