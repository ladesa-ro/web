<script setup lang="ts">
import {
  ComboboxAnchor as Anchor,
  ComboboxRoot as AutocompleteRoot,
  ComboboxContent as Content,
  ComboboxInput as Input,
  ComboboxEmpty as NoResultsState,
  ComboboxPortal as Portal,
  ComboboxTrigger as Trigger,
  ComboboxViewport as Viewport,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from 'reka-ui';
import { getParsedItems, type ParsedItem } from '~/composables/useOptionItems';
import type { AutocompleteProps } from '../../-Utils/inputTypes';
import Arrow from '../IconArrow.vue';
import AutocompleteItem from '../Item.vue';

const props = withDefaults(
  defineProps<
    AutocompleteProps & {
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

const items = computed(() => getParsedItems(props.items));

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

// reka-ui precisa de valores primitivos para matching
const primitiveValues = computed({
  get: () => (modelValue.value ?? []).map(getValueFn.value),
  set: (vals: (string | number)[]) => {
    modelValue.value = vals.map(buildItemFn.value);
  },
});

const selectedTags = computed(() => {
  return primitiveValues.value.map(v => {
    const item = items.value.find((i: ParsedItem) => i.value === v);
    return { value: v, label: item?.label ?? String(v) };
  });
});
</script>

<template>
  <AutocompleteRoot
    v-model="primitiveValues"
    v-model:open="open"
    :disabled
    :class="disabled && 'opacity-90 cursor-not-allowed'"
    multiple
  >
    <Anchor
      class="input-base flex-wrap min-h-12"
      :class="{ 'has-error': error }"
    >
      <label>{{ label }}</label>

      <TagsInputRoot
        v-model="primitiveValues"
        class="flex flex-wrap gap-1.5 items-center flex-1 py-2"
        delimiter=""
      >
        <TagsInputItem
          v-for="tag in selectedTags"
          :key="tag.value"
          :value="tag.value"
          class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-ldsa-green-1/15 text-ldsa-green-1 text-xs font-semibold"
        >
          <span>{{ tag.label }}</span>
          <TagsInputItemDelete class="cursor-pointer hover:text-ldsa-red">
            <IconsClose class="w-2 h-2" />
          </TagsInputItemDelete>
        </TagsInputItem>

        <Input
          :placeholder="modelValue.length === 0 ? placeholder : ''"
          class="flex-1 min-w-20 outline-none"
          as-child
          @blur="onBlur?.()"
          @click="open = true"
        >
          <TagsInputInput
            class="outline-none flex-1 min-w-20"
            @click="open = true"
          />
        </Input>
      </TagsInputRoot>

      <button
        v-if="modelValue.length > 0"
        type="button"
        class="p-1.5 bg-ldsa-grey/20 rounded-full shrink-0"
        @click.stop="modelValue = []"
      >
        <IconsClose class="w-2.5 h-2.5 text-ldsa-text-default/50" />
      </button>

      <Trigger class="px-3 py-4 shrink-0">
        <Arrow :disabled :open="open" />
      </Trigger>
    </Anchor>

    <Portal>
      <Content
        class="input-base-content w-(--reka-combobox-trigger-width) z-10000 py-2"
        position="popper"
      >
        <Viewport class="max-h-68 overflow-y-auto">
          <NoResultsState
            class="flex items-center px-3 font-normal text-ldsa-grey h-(--reka-combobox-trigger-height)"
          >
            Nenhum resultado encontrado
          </NoResultsState>

          <AutocompleteItem
            v-for="item in items"
            :key="item.value"
            mode="autocomplete"
            :item="item"
          />
        </Viewport>
      </Content>
    </Portal>

    <p v-if="error" class="text-ldsa-red text-xs font-semibold">
      {{ error }}
    </p>
  </AutocompleteRoot>
</template>

<style src="../../-Utils/style/inputStyles.css" />

<style scoped>
.input-base {
  padding-right: 0;
}
</style>
