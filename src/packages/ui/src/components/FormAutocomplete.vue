<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ComboboxAnchor,
  ComboboxCancel,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui';
import IconClose from '../icons/Close.vue';
import FormOptionFieldArrow from './FormOptionFieldArrow.vue';
import FormOptionItem from './FormOptionItem.vue';
import { getParsedOptionItems } from './option-item';
import type { FormAutocompleteProps } from './form-input-types';

const {
  items: itemsProps,
  label,
  placeholder,
  error,
  onBlur,
} = defineProps<
  FormAutocompleteProps & {
    error?: string | null;
    onBlur?: () => void;
    disabled?: boolean;
  }
>();

const items = getParsedOptionItems(itemsProps);

const selectedOption = defineModel<string | number | null>('selectedOption', {
  required: false,
  default: null,
});

const search = defineModel<string | null>('searchTerm', {
  required: false,
  default: null,
});

const open = ref(false);

const getDisplayValue = (value: string) => {
  const item = items.find(i => i.value === value);
  return item ? item.label : '';
};
</script>

<template>
  <ComboboxRoot
    v-model="selectedOption"
    v-model:open="open"
    :disabled
    class="ui-autocomplete"
    :class="disabled && 'ui-autocomplete--disabled'"
  >
    <ComboboxAnchor class="ui-input-base ui-autocomplete__anchor" :class="{ 'ui-input-has-error': error }">
      <label>{{ label }}</label>

      <ComboboxInput
        :model-value="search ?? undefined"
        :placeholder="placeholder"
        class="ui-autocomplete__input"
        :display-value="(value: any) => getDisplayValue(value)"
        @update:model-value="search = $event"
        @click="open = !open"
        @blur="onBlur?.()"
      />

      <ComboboxCancel v-if="selectedOption && !disabled" class="ui-autocomplete__clear" @click="selectedOption = null">
        <IconClose class="ui-autocomplete__clear-icon" />
      </ComboboxCancel>

      <ComboboxTrigger class="ui-autocomplete__trigger">
        <FormOptionFieldArrow :disabled :open="open" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent class="ui-input-base-content ui-autocomplete__content" position="popper">
        <ComboboxViewport class="ui-autocomplete__viewport">
          <ComboboxEmpty class="ui-autocomplete__no-results">Nenhum resultado encontrado</ComboboxEmpty>

          <FormOptionItem v-for="item in items" :key="item.value" mode="autocomplete" :item="item" />
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
    <p v-if="error" class="ui-autocomplete__error">{{ error }}</p>
  </ComboboxRoot>
</template>
