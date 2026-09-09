<script lang="ts" setup>
import type { Component } from 'vue';

export type AccessRoleButtonProps = {
  positionName: string;
  to: string;
  active: boolean;
  as?: string | Component;
};

const { as = 'a' } = defineProps<AccessRoleButtonProps>();
</script>

<template>
  <component
    :is="as"
    :to="to"
    :href="to"
    class="ui-access-role-button u-flex u-flex-col u-justify-end u-items-center u-gap-2 u-rounded-lg u-text-center u-font-semibold u-py-7"
    :class="{ 'ui-access-role-button--active': active }"
  >
    <slot />

    {{ positionName }}
  </component>
</template>
