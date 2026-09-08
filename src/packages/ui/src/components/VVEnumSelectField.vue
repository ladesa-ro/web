<script lang="ts" setup>
import { computed } from 'vue';
import FormSelect from './FormSelect.vue';
import { useVVField } from './vv-field';

export type VVEnumSelectFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  items: Array<{ label: string; value: string }>;
  disabled?: boolean;
  required?: boolean;
};

const props = defineProps<VVEnumSelectFieldProps>();

const { fieldValue, errorMessage, fieldDisabled, handleBlur } = useVVField<
  string | null
>({
  name: () => props.name,
  disabled: () => props.disabled,
  required: () => props.required,
  requiredMessage: 'Campo obrigatório',
});

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
    <FormSelect
      v-model="selectedItem"
      :items="items"
      :label="label"
      :placeholder="placeholder"
      :disabled="fieldDisabled"
      @blur="handleBlur"
    />

    <p
      v-if="errorMessage"
      class="ui-field-error u-text-xs u-font-semibold u-px-1"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
