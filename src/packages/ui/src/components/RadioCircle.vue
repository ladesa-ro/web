<script setup lang="ts">
import { RadioGroupIndicator as Selected, RadioGroupItem as Radio } from 'reka-ui';
import type { ParsedOptionItem } from './option-item';

type Props = { itemValue: ParsedOptionItem['value']; isSelected: boolean };
defineProps<Props>();
</script>

<template>
  <Radio
    :value="itemValue"
    class="ui-radio-circle"
    :class="isSelected ? 'ui-radio-circle--selected' : 'ui-radio-circle--unselected'"
  >
    <Selected v-if="isSelected" class="ui-radio-circle__indicator" />
  </Radio>
</template>
