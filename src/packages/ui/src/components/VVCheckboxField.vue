<script lang="ts" setup>
import { CheckboxIndicator as Check, CheckboxRoot as Checkbox } from 'reka-ui';
import IconConfirm from '../icons/Confirm.vue';
import { useVVField } from './vv-field';

export type VVCheckboxFieldProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const props = defineProps<VVCheckboxFieldProps>();

const { fieldValue, fieldDisabled } = useVVField<boolean>({
  name: () => props.name,
  disabled: props.disabled,
});
</script>

<template>
  <label
    class="ui-vv-checkbox u-flex u-items-center u-gap-2-5"
    :class="{ 'ui-vv-checkbox--disabled': fieldDisabled }"
  >
    <span class="ui-vv-checkbox__shadow u-rounded-full">
      <Checkbox
        v-model:model-value="fieldValue"
        :disabled="fieldDisabled"
        class="ui-vv-checkbox__box u-flex u-rounded-sm"
        :class="
          fieldValue
            ? 'ui-vv-checkbox__box--checked'
            : 'ui-vv-checkbox__box--unchecked'
        "
      >
        <Check class="ui-vv-checkbox__indicator u-flex-1 u-p-1 u-pt-1-5">
          <IconConfirm class="ui-vv-checkbox__indicator-icon" />
        </Check>
      </Checkbox>
    </span>

    <span v-if="label" class="ui-vv-checkbox__label u-text-sm u-font-medium">
      {{ label }}
    </span>
  </label>
</template>
