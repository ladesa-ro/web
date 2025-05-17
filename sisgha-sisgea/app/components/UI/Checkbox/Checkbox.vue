<script setup lang="ts">
import {
  type AcceptableValue,
  CheckboxIndicator as Check,
  CheckboxRoot as Checkbox,
  CheckboxGroupRoot,
} from 'reka-ui';
import { type Item, getParsedItems } from '~/composables/useOptionItems';

type Props = { items: Item[] };
const { items: itemsProps } = defineProps<Props>();

const items = getParsedItems(itemsProps);

//

const checkedItems = defineModel<AcceptableValue[]>();
</script>

<template>
  <CheckboxGroupRoot v-model="checkedItems">
    <label v-for="item in items" class="flex items-center gap-1 cursor-pointer">
      <span class="hover:bg-ldsa-green-2/10 content-box p-1.5 rounded-full">
        <Checkbox
          :value="item.value"
          class="flex border-2 border-ldsa-grey rounded-sm w-5.5 h-5.5"
        >
          <Check class="flex-1 bg-ldsa-green-2 p-1 pt-1.5">
            <IconsIconConfirm class="text-ldsa-white" />
          </Check>
        </Checkbox>
      </span>

      {{ item.label }}
    </label>
  </CheckboxGroupRoot>
</template>
