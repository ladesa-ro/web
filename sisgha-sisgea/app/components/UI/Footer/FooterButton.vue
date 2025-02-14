<script setup lang="ts">
type Link = {
  label: string;
  icon: Component | (SVGElement & HTMLElement);
  href: string;
};

type Props = {
  link: Link;
};

const { link } = defineProps<Props>();
</script>

<template>
  <a
    class="flex justify-strech items-center gap-2.5 rounded-sm py-1.5 px-3.5 text-sm font-medium tracking-[0.075em] transition-colors hover:bg-ldsa-grey/30 active:bg-ldsa-grey/60"
    :key="link.href"
    :href="link.href"
  >
    <component :is="link.icon" class="w-4 h-4" />

    {{ link.label.toUpperCase() }}
  </a>
</template>
