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
    :class="[
      'flex justify-strech items-center gap-2.5 rounded-sm px-3.5 py-2 text-sm font-medium tracking-[0.075em]',
      'hover:bg-ldsa-grey/30 active:bg-ldsa-grey/60 transition-[background-color] duration-200',
    ]"
    :key="link.href"
    :href="link.href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <component :is="link.icon" class="icon" />

    <span class="py-0 mt-px">
      {{ link.label.toUpperCase() }}
    </span>

    <IconsFooterIconHRef class="icon" />
  </a>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.icon {
  @apply w-4 h-4 shrink-0;
}
</style>
