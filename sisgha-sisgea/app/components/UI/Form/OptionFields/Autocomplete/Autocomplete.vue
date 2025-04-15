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
import type { AutocompleteProps } from '../../-Utils/inputTypes';
import Arrow from '../IconArrow.vue';
import AutocompleteItem from '../Item.vue';

defineProps<AutocompleteProps>();

//

const selectedOption = defineModel('selectedOption', {
  required: false,
  default: '',
});

const search = defineModel<string>('searchTerm', {
  required: false,
  default: '',
});

//

const open = ref(false);
</script>

<template>
  <AutocompleteRoot v-model="selectedOption" v-model:open="open">
    <Anchor class="input-base flex justify-between">
      <label>{{ label }}</label>

      <Input
        v-model="search"
        class="w-full h-full"
        :placeholder="placeholder"
        @click="open = !open"
      />

      <Cancel
        v-if="selectedOption"
        @click="selectedOption = ''"
        class="p-1.5 bg-ldsa-grey/20 rounded-full"
      >
        <IconsIconClose class="w-2.5 h-2.5 text-ldsa-text-default/50" />
      </Cancel>

      <Trigger class="px-3 py-4 shrink-0">
        <Arrow :open="open" />
      </Trigger>
    </Anchor>

    <Portal>
      <Content
        class="input-base-content w-(--reka-combobox-trigger-width)"
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
            v-for="(option, index) in options"
            :name="option[optionTitle]"
            :key="index"
          />
        </Viewport>
      </Content>
    </Portal>
  </AutocompleteRoot>
</template>

<style src="../../-Utils/style/inputStyles.css" />

<style scoped>
.input-base {
  padding-right: 0;
}
</style>
