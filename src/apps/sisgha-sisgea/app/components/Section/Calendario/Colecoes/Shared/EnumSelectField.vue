<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  items: Array<{ label: string; value: string }>;
  disabled?: boolean;
  required?: boolean;
};

const props = defineProps<Props>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

const {
  value: fieldValue,
  errorMessage,
  handleBlur,
} = useField<string | null>(
  () => props.name,
  inputValue => {
    if (!props.required) return true;
    return !!inputValue || 'Campo obrigatório';
  },
  { validateOnValueUpdate: false }
);

const selectedItem = computed({
  get: () => {
    const found = props.items.find(item => item.value === fieldValue.value);
    return found ? { label: found.label, value: found.value } : undefined;
  },
  set: (item: { label: string; value: string } | undefined) => {
    fieldValue.value = item?.value ?? null;
  },
});
</script>

<template>
  <div class="u-flex u-flex-col u-gap-1">
    <UIFormOptionFieldsSelect
      v-model="selectedItem"
      :items="items"
      :label="label"
      :placeholder="placeholder"
      :disabled="fieldDisabled"
      @blur="handleBlur"
    />
    <p
      v-if="errorMessage"
      class="enum-select-field__error u-text-xs u-font-semibold u-px-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.enum-select-field__error {
  color: var(--ladesa-red-color);
}
</style>
