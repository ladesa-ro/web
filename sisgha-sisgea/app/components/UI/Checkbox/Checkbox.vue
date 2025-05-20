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
    <label
      v-for="item in items"
      :key="item.value"
      class="flex items-center gap-1.5 cursor-pointer mb-1.5 last:mb-0"
    >
      <span
        class="rounded-full hover:shadow-[0_0_0_0.35rem_rgb(from_var(--ladesa-green-2-color)_R_G_B_/_10%)]"
      >
        <Checkbox
          :value="item.value"
          :class="
            checkedItems?.includes(item.value)
              ? 'border-ldsa-green-2'
              : 'border-ldsa-grey'
          "
          class="flex border-2 hover:bg-ldsa-green-2/10 rounded-sm w-5.5 h-5.5"
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
