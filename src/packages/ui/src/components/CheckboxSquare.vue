<script setup lang="ts">
import { CheckboxIndicator as Check, CheckboxRoot as Checkbox } from 'reka-ui';
import IconConfirm from '../icons/Confirm.vue';
import type { ParsedOptionItem } from './option-item';

export type CheckboxSquareProps = {
  item: ParsedOptionItem;
  active: boolean;
  disabled?: boolean;
  enterHandle?: (item: ParsedOptionItem) => void;
};
const { enterHandle = () => {}, disabled = false } = defineProps<CheckboxSquareProps>();
</script>

<template>
  <span class="ui-checkbox-square-wrapper">
    <Checkbox
      :value="item.value"
      :disabled="disabled ?? false"
      class="ui-checkbox-square"
      :class="active ? 'ui-checkbox-square--active' : 'ui-checkbox-square--inactive'"
      @keyup.enter="enterHandle(item)"
    >
      <Check class="ui-checkbox-square__check">
        <IconConfirm class="ui-checkbox-square__check-icon" />
      </Check>
    </Checkbox>
  </span>
</template>
