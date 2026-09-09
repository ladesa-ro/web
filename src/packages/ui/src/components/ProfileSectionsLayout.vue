<script lang="ts" setup>
import type { Component } from 'vue';

export type ProfileSectionsLayoutProps = {
  icon: Component | (HTMLElement & SVGElement);
  title: string;
};

defineProps<ProfileSectionsLayoutProps>();
</script>

<template>
  <section class="border-card ui-profile-section">
    <p
      class="ui-profile-section__header u-flex u-items-center u-gap-2-5 u-mb-4 u-font-semibold"
    >
      <component :is="icon" class="ui-profile-section__icon" />

      <span class="ui-profile-section__title u-text-sm">{{ title }}</span>
    </p>

    <slot />
  </section>
</template>
