<script lang="ts" setup>
import type { Component } from 'vue';

export type CardOptionProps = {
  text: string;
  icon?: Component | (SVGElement & HTMLElement);
};

const props = defineProps<CardOptionProps>();
</script>

<template>
  <div
    class="ui-card-option u-flex u-flex-col u-justify-center u-items-center u-py-8 u-gap-6"
  >
    <div class="ui-card-option__icon u-flex">
      <component :is="props.icon" />
    </div>

    <p>{{ props.text }}</p>
  </div>
</template>
