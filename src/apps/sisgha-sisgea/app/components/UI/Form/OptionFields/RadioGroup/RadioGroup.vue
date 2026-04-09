<script lang="ts" setup>
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'reka-ui';

type RadioItem = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    items: RadioItem[];
    label?: string;
    disabled?: boolean;
    orientation?: 'vertical' | 'horizontal';
  }>(),
  {
    orientation: 'vertical',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const selected = computed({
  get: () => props.modelValue,
  set: (val: string | number) => emit('update:modelValue', val),
});

function isItemDisabled(item: RadioItem): boolean {
  return props.disabled || !!item.disabled;
}
</script>

<template>
  <fieldset class="flex flex-col gap-1.5">
    <legend
      v-if="label"
      class="text-[0.813rem] font-semibold text-ldsa-grey mb-1"
    >
      {{ label }}
    </legend>

    <RadioGroupRoot
      v-model="selected"
      :disabled="disabled"
      :orientation="orientation"
      :class="
        orientation === 'horizontal'
          ? 'flex flex-row gap-4'
          : 'flex flex-col gap-2'
      "
    >
      <label
        v-for="item in items"
        :key="item.value"
        class="flex items-center gap-2.5 cursor-pointer"
        :class="{ 'opacity-60 cursor-not-allowed': isItemDisabled(item) }"
      >
        <span
          class="rounded-full radio-shadow focus-within:shadow-(--green-shadow) hover:shadow-(--green-shadow)"
        >
          <RadioGroupItem
            :value="item.value"
            :disabled="isItemDisabled(item)"
            class="radio-circle flex items-center justify-center border-2 rounded-full w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0 grow-0 focus-visible:outline-ldsa-green-2"
            :class="
              selected === item.value
                ? 'border-ldsa-green-2'
                : 'border-ldsa-grey'
            "
          >
            <RadioGroupIndicator
              class="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-ldsa-green-2 rounded-full"
            />
          </RadioGroupItem>
        </span>

        <span class="text-sm font-medium text-ldsa-text-default select-none">
          {{ item.label }}
        </span>
      </label>
    </RadioGroupRoot>
  </fieldset>
</template>

<style scoped>
.radio-shadow {
  --green: rgb(from var(--ladesa-green-2-color) R G B / 10%);
  --green-shadow: 0 0 0 0.35rem var(--green);
}
.radio-shadow:focus-within {
  background-color: var(--green);
}
</style>
