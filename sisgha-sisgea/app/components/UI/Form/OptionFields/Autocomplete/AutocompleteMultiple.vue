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

const {
  items: itemsProps,
  label,
  placeholder,
  error,
  onBlur,
} = defineProps<
  AutocompleteProps & {
    error?: string | null;
    onBlur?: () => void;
    disabled?: boolean;
  }
>();

const items = computed(() => getParsedItems(itemsProps));

const modelValue = defineModel<Array<string | number>>('selectedOptions', {
  required: false,
  default: () => [],
});

const search = defineModel<string>('searchTerm', {
  required: false,
  default: '',
});

const open = ref(false);

const selectedLabels = computed(() => {
  const vals = modelValue.value ?? [];
  return vals.map(v => {
    const item = items.value.find((i: ParsedItem) => i.value === v);
    return item?.label ?? String(v);
  });
});
</script>

<template>
  <AutocompleteRoot
    :disabled
    :class="disabled && 'opacity-90 cursor-not-allowed'"
    v-model="modelValue"
    v-model:open="open"
    multiple
  >
    <Anchor
      class="input-base flex-wrap min-h-12"
      :class="{ 'has-error': error }"
    >
      <label>{{ label }}</label>

      <TagsInputRoot
        v-model="modelValue"
        class="flex flex-wrap gap-1.5 items-center flex-1 py-2"
        delimiter=""
      >
        <TagsInputItem
          v-for="tag in selectedLabels"
          :key="tag"
          :value="tag"
          class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-ldsa-green-1/15 text-ldsa-green-1 text-xs font-semibold"
        >
          <TagsInputItemText />
          <TagsInputItemDelete class="cursor-pointer hover:text-ldsa-red">
            <IconsClose class="w-2 h-2" />
          </TagsInputItemDelete>
        </TagsInputItem>

        <Input
          :placeholder="modelValue.length === 0 ? placeholder : ''"
          @blur="onBlur?.()"
          @click="open = true"
          class="flex-1 min-w-20 outline-none"
          as-child
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
        @click.stop="modelValue = []"
        class="p-1.5 bg-ldsa-grey/20 rounded-full shrink-0"
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
            mode="autocomplete"
            v-for="item in items"
            :item="item"
            :key="item.value"
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
