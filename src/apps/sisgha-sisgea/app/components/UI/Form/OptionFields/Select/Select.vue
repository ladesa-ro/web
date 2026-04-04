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

const props = withDefaults(defineProps<SelectProps>(), {
  multipleOptions: false,
});

//

const selectedItem = defineModel<ParsedItem>({
  required: false,
  default: null,
});

const internalValue = computed({
  get: () => selectedItem.value?.value ?? undefined,
  set: (val: any) => {
    const found = props.items?.find(
      (i) => (typeof i === 'object' ? i.value : i) === val,
    );
    if (found && typeof found === 'object') {
      selectedItem.value = { label: String(found.label), value: val };
    } else if (found) {
      selectedItem.value = { label: String(found), value: val };
    } else {
      selectedItem.value = undefined as any;
    }
  },
});

const open = ref(false);

const hasValue = computed(() => selectedItem.value != null);

function clear(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  selectedItem.value = undefined as any;
  open.value = false;
}
</script>

<template>
  <SelectRoot
    v-model="internalValue"
    v-model:open="open"
    :multiple="multipleOptions"
    :disabled="props.disabled"
  >
    <Trigger class="input-base" :class="{ 'opacity-50 cursor-not-allowed': props.disabled }" v-bind="$attrs">
      <label>{{ label }}</label>
      <Value :placeholder="placeholder" />
      <button
        v-if="hasValue && !props.disabled"
        class="shrink-0 text-ldsa-grey hover:text-ldsa-red transition-colors"
        tabindex="-1"
        @pointerdown="clear"
      >
        &#10005;
      </button>
      <Arrow v-else :open="open" />
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
