<script setup lang="ts">
import {
  type AcceptableValue,
  CheckboxIndicator as Check,
  CheckboxRoot as Checkbox,
  CheckboxGroupRoot,
} from 'reka-ui';
import {
  type Item,
  type ParsedItem,
  getParsedItems,
} from '~/composables/useOptionItems';

type Props = {
  items: Item[];
  truncateText?: boolean;
  disabledItems?: AcceptableValue[];
};

const {
  items: itemsProps,
  truncateText = false,
  disabledItems = [],
} = defineProps<Props>();

const items = getParsedItems(itemsProps);
const checkedItems = defineModel<AcceptableValue[]>({ default: [] });

const invertItem = (item: ParsedItem) => {
  if (disabledItems.includes(item.value)) return; // impede ação se estiver desabilitado

  if (checkedItems.value.includes(item.value)) {
    checkedItems.value = checkedItems.value.filter(
      value => value !== item.value
    );
  } else {
    checkedItems.value.push(item.value);
  }
};
</script>

<template>
  <CheckboxGroupRoot v-model="checkedItems">
    <label
      v-for="item in items"
      :key="item.value"
      class="flex items-center gap-1.5 cursor-pointer mb-1.5 last:mb-0 text-ldsa-text-default"
      :class="{
        'opacity-50 cursor-not-allowed': disabledItems.includes(item.value),
      }"
    >
      <span
        class="rounded-full checkbox-shadow focus-within:shadow-(--green-shadow) hover:shadow-(--green-shadow)"
      >
        <Checkbox
          :value="item.value"
          :disabled="disabledItems.includes(item.value)"
          :class="[
            checkedItems?.includes(item.value)
              ? 'border-ldsa-green-2'
              : 'border-ldsa-grey',
          ]"
          class="flex border-2 hover:bg-ldsa-green-2/10 rounded-sm w-5.5 h-5.5 focus-visible:outline-ldsa-green-2"
          @keyup.enter="invertItem(item)"
        >
          <Check class="flex-1 bg-ldsa-green-2 p-1 pt-1.5">
            <IconsConfirm class="text-ldsa-white" />
          </Check>
        </Checkbox>
      </span>

      <span v-bind="$attrs" :class="{ truncate: truncateText }">
        {{ item.label }}
      </span>
    </label>
  </CheckboxGroupRoot>
</template>

<style scoped>
.checkbox-shadow {
  --green: rgb(from var(--ladesa-green-2-color) R G B / 10%);
  --green-shadow: 0 0 0 0.35rem var(--green);
}

.checkbox-shadow:focus-within {
  background-color: var(--green);
}
</style>
