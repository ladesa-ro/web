<script lang="ts" setup>
import type { Component } from 'vue';

export type CardLinkProps = {
  to?: string;
  icon: Component;
  title: string;
  as?: string | Component;
};

const { as = 'a' } = defineProps<CardLinkProps>();
</script>

<template>
  <component
    :is="as"
    :to="to"
    :href="to"
    class="ui-card-link u-rounded-md u-p-6 u-flex u-flex-col u-items-center"
  >
    <component :is="icon" class="ui-card-link__icon u-mb-4" />

    <span class="ui-card-link__label u-font-bold">{{ title }}</span>
  </component>
</template>
