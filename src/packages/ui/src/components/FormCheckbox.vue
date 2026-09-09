<script lang="ts" setup>
import { CheckboxIndicator as Check, CheckboxRoot as Checkbox } from 'reka-ui';
import { computed } from 'vue';
import IconConfirm from '../icons/Confirm.vue';

const props = defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const checked = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
});
</script>

<template>
  <label
    class="ui-form-checkbox"
    :class="{ 'ui-form-checkbox--disabled': disabled }"
  >
    <span class="ui-checkbox-square-wrapper">
      <Checkbox
        v-model:model-value="checked"
        :disabled="disabled"
        class="ui-checkbox-square"
        :class="
          checked
            ? 'ui-checkbox-square--active'
            : 'ui-checkbox-square--inactive'
        "
      >
        <Check class="ui-checkbox-square__check">
          <IconConfirm class="ui-checkbox-square__check-icon" />
        </Check>
      </Checkbox>
    </span>
    <span v-if="label || $slots.default" class="ui-form-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
