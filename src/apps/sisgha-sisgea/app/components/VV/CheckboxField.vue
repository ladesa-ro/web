<script lang="ts" setup>
import { CheckboxIndicator as Check, CheckboxRoot as Checkbox } from 'reka-ui';
import { useVVField } from './-Helpers/useVVField';

const props = defineProps<{
  name: string;
  label?: string;
  disabled?: boolean;
}>();

const { fieldValue, fieldDisabled } = useVVField<boolean>({
  name: () => props.name,
  disabled: props.disabled,
});
</script>

<template>
  <label
    class="checkbox-root u-flex u-items-center u-gap-2-5"
    :class="{ 'checkbox-root--disabled': fieldDisabled }"
  >
    <span class="checkbox-shadow u-rounded-full">
      <Checkbox
        v-model:model-value="fieldValue"
        :disabled="fieldDisabled"
        :class="fieldValue ? 'checkbox-box--checked' : 'checkbox-box--unchecked'"
        class="checkbox-box u-flex u-rounded-sm"
      >
        <Check class="checkbox-indicator u-flex-1 u-p-1 u-pt-1-5">
          <IconsConfirm class="checkbox-indicator-icon" />
        </Check>
      </Checkbox>
    </span>
    <span v-if="label" class="checkbox-label-text u-text-sm u-font-medium">
      {{ label }}
    </span>
  </label>
</template>

<style scoped>
.checkbox-root {
  cursor: pointer;
}

.checkbox-root--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox-shadow {
  --checkbox-shadow-color: rgb(from var(--ladesa-green-2-color) R G B / 10%);
}

.checkbox-shadow:focus-within,
.checkbox-shadow:hover {
  box-shadow: 0 0 0 0.35rem var(--checkbox-shadow-color);
}

.checkbox-shadow:focus-within {
  background-color: var(--checkbox-shadow-color);
}

.checkbox-box {
  border: 2px solid;
  width: 1.375rem;
  height: 1.375rem;
}

.checkbox-box:hover {
  background-color: rgb(from var(--ladesa-green-2-color) R G B / 10%);
}

.checkbox-box:focus-visible {
  outline-color: var(--ladesa-green-2-color);
}

.checkbox-box--checked {
  border-color: var(--ladesa-green-2-color);
}

.checkbox-box--unchecked {
  border-color: var(--ladesa-grey-color);
}

.checkbox-indicator {
  background-color: var(--ladesa-green-2-color);
}

.checkbox-indicator-icon {
  color: var(--ladesa-white-color);
}

.checkbox-label-text {
  color: var(--ladesa-text-default-color);
  user-select: none;
}
</style>
