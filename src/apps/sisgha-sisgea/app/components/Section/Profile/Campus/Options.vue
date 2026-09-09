<script lang="ts" setup>
import {
  ComboboxContent as Content,
  ComboboxEmpty as NoResultsState,
  ComboboxPortal as Portal,
  ComboboxViewport as Viewport,
} from 'reka-ui';
import AutoCompleteItem from '../../../UI/Form/OptionFields/Item.vue';

type CampusItem = { label: string; value: string };

defineProps<{ campi: CampusItem[] }>();
</script>

<template>
  <Portal>
    <Content
      class="campus-select__content u-rounded-lg"
      position="popper"
      side="bottom"
      align="start"
    >
      <Viewport class="campus-select__viewport">
        <NoResultsState
          class="campus-select__no-results u-px-3 u-py-2 u-flex u-items-start"
        >
          Nenhum resultado encontrado
        </NoResultsState>

        <AutoCompleteItem
          v-for="campus in campi"
          :key="campus.value"
          :item="campus"
          mode="autocomplete"
        />
      </Viewport>
    </Content>
  </Portal>
</template>

<style scoped>
.campus-select__content {
  width: var(--reka-combobox-trigger-width);
  z-index: 10000;
  background-color: var(--ladesa-background-color);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 10%),
    0 4px 6px -4px rgb(0 0 0 / 10%);
}

.campus-select__viewport {
  font-size: 0.6875rem;
}

.campus-select__no-results {
  color: var(--ladesa-grey-color);
  font-weight: var(--ui-font-weight-regular);
  min-height: 2.25rem;
}
</style>
