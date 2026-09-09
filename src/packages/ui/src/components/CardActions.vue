<script setup lang="ts">
import IconEyeOn from '../icons/Eye/EyeOn.vue';

export type CardActionsProps = {
  to?: string;
  as?: string | object;
};

const { as = 'a' } = defineProps<CardActionsProps>();
</script>

<template>
  <div class="ui-card-actions">
    <slot />
    <component :is="as" v-if="to" :to="to" class="ui-card-actions__link">
      <IconEyeOn class="ui-card-actions__icon" />
    </component>
  </div>
</template>
