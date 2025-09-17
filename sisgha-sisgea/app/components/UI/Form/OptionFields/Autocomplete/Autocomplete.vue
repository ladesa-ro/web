<script setup lang="ts">
import {
  ComboboxAnchor as Anchor,
  ComboboxRoot as AutocompleteRoot,
  ComboboxCancel as Cancel,
  ComboboxContent as Content,
  ComboboxInput as Input,
  ComboboxEmpty as NoResultsState,
  ComboboxPortal as Portal,
  ComboboxTrigger as Trigger,
  ComboboxViewport as Viewport,
} from 'reka-ui';
import { ref } from 'vue';
import { useFormField } from '~/composables/useFormField';
import { getParsedItems } from '~/composables/useOptionItems';
import type { AutocompleteProps } from '../../-Utils/inputTypes';
import Arrow from '../IconArrow.vue';
import AutocompleteItem from '../Item.vue';

const { items: itemsProps, label, placeholder } = defineProps<AutocompleteProps>();
const items = getParsedItems(itemsProps);

const selectedOption = defineModel<string | number | null>('selectedOption', {
  required: false,
  default: null,
});
const search = defineModel<string | null>('searchTerm', {
  required: false,
  default: null,
});
const open = ref(false);

const { fieldValue: modelValue, errorMessage, handleBlur } = useFormField<string>(
  'selectedOption',
  selectedOption,
  val => (!val ? 'Selecione uma opção' : true)
);

const getDisplayValue = (value: string) => {
  const item = items.find(i => i.value === value);
  return item ? item.label : '';
};
</script>

<template>
  <AutocompleteRoot v-model="selectedOption" v-model:open="open">
    <Anchor
      class="input-base flex justify-between"
      :class="{'border-red-500': errorMessage, 'border-ldsa-grey': !errorMessage}"
    >
      <label>{{ label }}</label>

      <Input
        :v-model="search ?? undefined"
        :placeholder="placeholder"
        @click="open = !open"
        @blur="handleBlur"
        class="w-full h-full"
        :display-value="value => getDisplayValue(value)"
      />

      <Cancel
        v-if="selectedOption"
        @click="selectedOption = null"
        class="p-1.5 bg-ldsa-grey/20 rounded-full"
      >
        <IconsClose class="w-2.5 h-2.5 text-ldsa-text-default/50" />
      </Cancel>

      <Trigger class="px-3 py-4 shrink-0">
        <Arrow :open="open" />
      </Trigger>
    </Anchor>

    <Portal>
      <Content
        class="input-base-content w-(--reka-combobox-trigger-width) z-[10000]"
        position="popper"
      >
        <Viewport>
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
  </AutocompleteRoot>

  <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
</template>


<style src="../../-Utils/style/inputStyles.css" />

<style scoped>
.input-base {
  padding-right: 0;
}
</style>
