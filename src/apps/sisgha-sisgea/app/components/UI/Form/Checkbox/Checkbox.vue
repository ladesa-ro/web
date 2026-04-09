<script lang="ts" setup>
import { CheckboxIndicator as Check, CheckboxRoot as Checkbox } from 'reka-ui';

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
    class="flex items-center gap-2.5 cursor-pointer"
    :class="{ 'opacity-60 cursor-not-allowed': disabled }"
  >
    <span
      class="rounded-full checkbox-shadow focus-within:shadow-(--green-shadow) hover:shadow-(--green-shadow)"
    >
      <Checkbox
        v-model:model-value="checked"
        :disabled="disabled"
        :class="checked ? 'border-ldsa-green-2' : 'border-ldsa-grey'"
        class="flex border-2 hover:bg-ldsa-green-2/10 rounded-sm w-5.5 h-5.5 focus-visible:outline-ldsa-green-2"
      >
        <Check class="flex-1 bg-ldsa-green-2 p-1 pt-1.5">
          <IconsConfirm class="text-ldsa-white" />
        </Check>
      </Checkbox>
    </span>
    <span
      v-if="label || $slots.default"
      class="text-sm font-medium text-ldsa-text-default select-none"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.checkbox-shadow {
  --green: rgb(from var(--ladesa-green-2-color) R G B / 10%);
  --green-shadow: 0 0 0 0.35rem var(--green);
}
.checkbox-shadow:focus-within {
  background-color: var(--green);
}
</style>
