<script setup lang="ts">
import type { Component } from 'vue';
import IconFooterHRef from '../icons/Footer/HRef.vue';

export type FooterLink = {
  label: string;
  icon: Component | (SVGElement & HTMLElement);
  href: string;
};

export type FooterButtonProps = { link: FooterLink };
defineProps<FooterButtonProps>();
</script>

<template>
  <a
    :key="link.href"
    class="ui-footer-button"
    :href="link.href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <component :is="link.icon" class="ui-footer-button__icon" />

    <span class="ui-footer-button__label">
      {{ link.label.toUpperCase() }}
    </span>

    <IconFooterHRef class="ui-footer-button__icon" />
  </a>
</template>
