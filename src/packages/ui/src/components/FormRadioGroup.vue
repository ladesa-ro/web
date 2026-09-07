<script lang="ts" setup>
import { computed } from 'vue';
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from 'reka-ui';

export type FormRadioGroupItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type FormRadioGroupProps = {
  modelValue: string | number;
  items: FormRadioGroupItem[];
  label?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
};

const props = withDefaults(defineProps<FormRadioGroupProps>(), {
  orientation: 'vertical',
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const selected = computed({
  get: () => props.modelValue,
  set: (val: string | number) => emit('update:modelValue', val),
});

function isItemDisabled(item: FormRadioGroupItem): boolean {
  return props.disabled || !!item.disabled;
}
</script>

<template>
  <fieldset class="ui-form-radio-group">
    <legend v-if="label" class="ui-form-radio-group__legend">{{ label }}</legend>

    <RadioGroupRoot
      v-model="selected"
      :disabled="disabled"
      :orientation="orientation"
      :class="orientation === 'horizontal' ? 'ui-form-radio-group__items--horizontal' : 'ui-form-radio-group__items--vertical'"
    >
      <label
        v-for="item in items"
        :key="item.value"
        class="ui-form-radio-label"
        :class="{ 'ui-form-radio-label--disabled': isItemDisabled(item) }"
      >
        <span class="ui-form-radio-shadow">
          <RadioGroupItem
            :value="item.value"
            :disabled="isItemDisabled(item)"
            class="ui-form-radio-circle"
            :class="selected === item.value ? 'ui-form-radio-circle--selected' : 'ui-form-radio-circle--unselected'"
          >
            <RadioGroupIndicator class="ui-form-radio-indicator" />
          </RadioGroupItem>
        </span>

        <span class="ui-form-radio-label__text">{{ item.label }}</span>
      </label>
    </RadioGroupRoot>
  </fieldset>
</template>
