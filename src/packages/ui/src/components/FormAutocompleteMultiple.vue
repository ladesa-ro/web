<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputRoot,
} from 'reka-ui';
import IconClose from '../icons/Close.vue';
import FormOptionFieldArrow from './FormOptionFieldArrow.vue';
import FormOptionItem from './FormOptionItem.vue';
import { getParsedOptionItems, type ParsedOptionItem } from './option-item';
import type { FormAutocompleteProps } from './form-input-types';

const props = withDefaults(
  defineProps<
    FormAutocompleteProps & {
      error?: string | null;
      onBlur?: () => void;
      disabled?: boolean;
      getValue?: (item: any) => string | number;
      buildItem?: (value: string | number) => any;
    }
  >(),
  {
    getValue: undefined,
    buildItem: undefined,
  }
);

const items = computed(() => getParsedOptionItems(props.items));

const modelValue = defineModel<Array<any>>('selectedOptions', {
  required: false,
  default: () => [],
});

const search = defineModel<string>('searchTerm', {
  required: false,
  default: '',
});

const open = ref(false);

const getValueFn = computed(
  () => props.getValue ?? ((v: any) => v as string | number)
);
const buildItemFn = computed(
  () => props.buildItem ?? ((v: string | number) => v)
);

const primitiveValues = computed({
  get: () => (modelValue.value ?? []).map(getValueFn.value),
  set: (vals: (string | number)[]) => {
    modelValue.value = vals.map(buildItemFn.value);
  },
});

const selectedTags = computed(() => {
  return primitiveValues.value.map(v => {
    const item = items.value.find((i: ParsedOptionItem) => i.value === v);
    return { value: v, label: item?.label ?? String(v) };
  });
});
</script>

<template>
  <ComboboxRoot
    v-model="primitiveValues"
    v-model:open="open"
    :disabled
    class="ui-autocomplete"
    :class="disabled && 'ui-autocomplete--disabled'"
    multiple
  >
    <ComboboxAnchor
      class="ui-input-base ui-autocomplete__anchor ui-autocomplete-multiple__anchor"
      :class="{ 'ui-input-has-error': error }"
    >
      <label>{{ label }}</label>

      <TagsInputRoot
        v-model="primitiveValues"
        class="ui-autocomplete-multiple__tags"
        delimiter=""
      >
        <TagsInputItem
          v-for="tag in selectedTags"
          :key="tag.value"
          :value="tag.value"
          class="ui-autocomplete-multiple__tag"
        >
          <span>{{ tag.label }}</span>
          <TagsInputItemDelete class="ui-autocomplete-multiple__tag-delete">
            <IconClose />
          </TagsInputItemDelete>
        </TagsInputItem>

        <ComboboxInput
          :placeholder="modelValue.length === 0 ? placeholder : ''"
          class="ui-autocomplete-multiple__tag-input"
          as-child
          @blur="onBlur?.()"
          @click="open = true"
        >
          <TagsInputInput
            class="ui-autocomplete-multiple__tag-input"
            @click="open = true"
          />
        </ComboboxInput>
      </TagsInputRoot>

      <button
        v-if="modelValue.length > 0"
        type="button"
        class="ui-autocomplete-multiple__clear"
        @click.stop="modelValue = []"
      >
        <IconClose class="ui-autocomplete__clear-icon" />
      </button>

      <ComboboxTrigger class="ui-autocomplete__trigger">
        <FormOptionFieldArrow :disabled :open="open" />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        class="ui-input-base-content ui-autocomplete__content"
        position="popper"
      >
        <ComboboxViewport class="ui-autocomplete__viewport">
          <ComboboxEmpty class="ui-autocomplete__no-results"
            >Nenhum resultado encontrado</ComboboxEmpty
          >

          <FormOptionItem
            v-for="item in items"
            :key="item.value"
            mode="autocomplete"
            :item="item"
          />
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>

    <p v-if="error" class="ui-autocomplete__error">{{ error }}</p>
  </ComboboxRoot>
</template>
