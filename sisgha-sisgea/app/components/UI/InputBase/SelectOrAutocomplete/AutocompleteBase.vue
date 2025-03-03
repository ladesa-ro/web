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
} from 'radix-vue';
import Arrow from './IconArrow/IconArrow.vue';
import AutocompleteItem from './ItemList/ItemList.vue';

type Props = {
  options: any[];
  placeholder: string;
  label: string;
};

defineProps<Props>();

const autocompleteValue = ref('');

const open = ref(false);
</script>

<template>
  <AutocompleteRoot v-model="autocompleteValue" v-model:open="open">
    <Anchor class="input-base flex justify-between">
      <label>{{ label }}</label>

      <Input
        class="w-full h-full"
        :placeholder="placeholder"
        @click="open = !open"
      />

      <Cancel
        v-if="autocompleteValue !== ''"
        @click="autocompleteValue = ''"
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
        class="input-base-content w-(--radix-combobox-trigger-width)"
        position="popper"
      >
        <Viewport>
          <NoResultsState
            class="flex items-center px-3 font-normal text-ldsa-grey h-(--radix-combobox-trigger-height)"
          >
            Nenhum resultado encontrado
          </NoResultsState>

          <AutocompleteItem
            mode="autocomplete"
            v-for="(option, index) in options"
            :value="option"
            :key="index"
          />
        </Viewport>
      </Content>
    </Portal>
  </AutocompleteRoot>
</template>

<style src="../styles/InputBase.css" />

<style scoped>
.input-base {
  padding-right: 0;
}
</style>
