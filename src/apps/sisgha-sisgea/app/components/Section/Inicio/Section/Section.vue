<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<template>
  <section class="u-flex u-flex-col u-gap-4 inicio-section">
    <h2 class="u-text-lg u-font-medium inicio-section__title">{{ title }}</h2>
    <div class="u-flex-1 u-grid u-gap-4 inicio-section__grid">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.inicio-section {
  border-top: 1px solid var(--ladesa-grey-color);
  padding-top: var(--ui-space-8);
  padding-bottom: 2.25rem;
}

.inicio-section__title {
  line-height: 1rem;
}

.inicio-section__grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 501px) {
  .inicio-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .inicio-section__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1536px) {
  .inicio-section__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
