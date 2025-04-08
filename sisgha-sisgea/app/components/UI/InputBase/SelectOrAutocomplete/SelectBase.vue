<script lang="ts" setup>
import {
  SelectContent as Content,
  SelectPortal as Portal,
  SelectRoot,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectViewport as Viewport,
} from 'reka-ui';
import type { SelectProps } from '../InputTypes';
import Arrow from './IconArrow/IconArrow.vue';
import SelectItem from './ItemList/ItemList.vue';

type Props = SelectProps;

defineProps<Props>();

//

const selectedItem = ref();

//

const open = ref(false);
</script>

<template>
  <SelectRoot v-model="selectedItem" v-model:open="open">
    <Trigger class="input-base" v-bind="$attrs">
      <label>{{ label }}</label>
      <Value :placeholder="placeholder" />
      <Arrow :open="open" />
    </Trigger>

    <Portal>
      <Content
        class="input-base-content w-(--reka-select-trigger-width)"
        position="popper"
      >
        <Viewport>
          <SelectItem
            v-for="(option, index) in options"
            mode="select"
            :value="option"
            :key="index"
          />
        </Viewport>
      </Content>
    </Portal>
  </SelectRoot>
</template>

<style src="../styles/InputBase.css"></style>
