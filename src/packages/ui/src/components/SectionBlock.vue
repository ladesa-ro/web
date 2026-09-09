<script lang="ts" setup>
export type SectionBlockProps = {
  title: string;
};

defineProps<SectionBlockProps>();
</script>

<template>
  <section class="ui-section-block u-flex u-flex-col u-gap-4">
    <h2 class="ui-section-block__title u-text-lg u-font-medium">{{ title }}</h2>

    <div class="ui-section-block__grid u-flex-1 u-grid u-gap-4">
      <slot />
    </div>
  </section>
</template>
