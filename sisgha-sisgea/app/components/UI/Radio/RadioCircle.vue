<script setup lang="ts">
import {
  RadioGroupItem as Radio,
  RadioGroupIndicator as Selected,
} from 'reka-ui';

type Props = { itemValue: ParsedItem['value']; isSelected: boolean };
defineProps<Props>();
</script>

<template>
  <Radio
    :value="itemValue"
    class="border-2 rounded-full h-5.5 w-5.5 flex items-center justify-center"
    :class="isSelected ? 'border-ldsa-green-2' : 'border-ldsa-grey'"
  >
    <Selected
      v-if="isSelected"
      class="h-3.5 w-3.5 bg-ldsa-green-2 rounded-full"
    />
  </Radio>
</template>
