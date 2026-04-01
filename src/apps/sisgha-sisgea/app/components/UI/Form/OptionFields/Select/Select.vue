<script lang="ts" setup>
import {
  SelectContent as Content,
  SelectPortal as Portal,
  SelectRoot,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectViewport as Viewport,
} from 'reka-ui';
import type { SelectProps } from '../../-Utils/inputTypes';
import Arrow from '../IconArrow.vue';
import SelectItem from '../Item.vue';

const { multipleOptions = false } = defineProps<SelectProps>();

//

const selectedItem = defineModel<ParsedItem>({
  required: false,
  default: null,
});

const open = ref(false);
</script>

<template>
  <SelectRoot
    v-model="selectedItem"
    v-model:open="open"
    :multiple="multipleOptions"
  >
    <Trigger class="input-base" v-bind="$attrs">
      <label>{{ label }}</label>
      <Value :placeholder="placeholder" />
      <Arrow :open="open" />
    </Trigger>

    <Portal>
      <Content
        class="input-base-content w-(--reka-select-trigger-width) z-10000 py-2"
        position="popper"
      >
        <Viewport>
          <SelectItem
            v-for="(item, index) of items"
            :key="index"
            mode="select"
            :item="item"
          />
        </Viewport>
      </Content>
    </Portal>
  </SelectRoot>
</template>

<style src="../../-Utils/style/inputStyles.css"></style>
