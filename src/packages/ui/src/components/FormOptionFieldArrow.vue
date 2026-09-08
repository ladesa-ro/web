<script setup lang="ts">
import IconArrowArrow from '../icons/Arrow/Arrow.vue';

export type FormOptionFieldArrowProps = { open?: boolean; disabled?: boolean };
defineProps<FormOptionFieldArrowProps>();
</script>

<template>
  <IconArrowArrow
    class="ui-option-field-arrow"
    :class="[
      open ? 'ui-option-field-arrow--open' : 'ui-option-field-arrow--closed',
      disabled
        ? 'ui-option-field-arrow--disabled'
        : 'ui-option-field-arrow--enabled',
    ]"
  />
</template>
