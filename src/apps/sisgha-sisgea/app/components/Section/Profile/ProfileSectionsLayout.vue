<script lang="ts" setup>
type Props = {
  icon: Component | (HTMLElement & SVGElement);
  title: string;
};

defineProps<Props>();
</script>

<template>
  <section class="border-card profile-section">
    <!-- section title -->
    <p class="profile-section__header u-flex u-items-center u-gap-2-5 u-mb-4 u-font-semibold">
      <component :is="icon" class="profile-section__icon" />
      <span class="profile-section__title u-text-sm"> {{ title }} </span>
    </p>

    <!-- section content -->
    <slot />
  </section>
</template>

<style scoped>
.profile-section {
  padding: var(--ui-space-3-5);
}

@media (min-width: 64rem) {
  .profile-section {
    padding: var(--ui-space-4);
  }
}

@media (min-width: 80rem) {
  .profile-section {
    padding: var(--ui-space-5);
  }
}

.profile-section__icon {
  width: 1.125rem;
}

@media (min-width: 48rem) {
  .profile-section__icon {
    width: 1.375rem;
  }
}

@media (min-width: 48rem) {
  .profile-section__title {
    font-size: 1rem;
  }
}
</style>
