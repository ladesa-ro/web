<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  SelectContent,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui';
import FormOptionFieldArrow from './FormOptionFieldArrow.vue';
import FormOptionItem from './FormOptionItem.vue';
import type { FormSelectProps } from './form-input-types';
import type { ParsedOptionItem } from './option-item';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<FormSelectProps>(), {
  multipleOptions: false,
});

const selectedItem = defineModel<ParsedOptionItem | undefined>({ required: false, default: undefined });

const internalValue = computed({
  get: () => selectedItem.value?.value ?? undefined,
  set: (val: any) => {
    const found = props.items?.find(i => (typeof i === 'object' ? i.value : i) === val);
    if (found && typeof found === 'object') {
      selectedItem.value = { label: String(found.label), value: val };
    } else if (found) {
      selectedItem.value = { label: String(found), value: val };
    } else {
      selectedItem.value = undefined;
    }
  },
});

const open = ref(false);

const hasValue = computed(() => selectedItem.value != null);

function clear(e: Event) {
  e.stopPropagation();
  e.preventDefault();
  selectedItem.value = undefined;
  open.value = false;
}
</script>

<template>
  <SelectRoot v-model="internalValue" v-model:open="open" :multiple="multipleOptions" :disabled="props.disabled">
    <SelectTrigger
      class="ui-input-base"
      :class="{ 'ui-select__trigger--disabled': props.disabled }"
      v-bind="$attrs"
    >
      <label>{{ label }}</label>
      <SelectValue class="ui-select__value" :placeholder="placeholder" />
      <button
        v-if="hasValue && !props.disabled"
        class="ui-select__clear"
        tabindex="-1"
        @pointerdown="clear"
      >
        &#10005;
      </button>
      <FormOptionFieldArrow v-else :open="open" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent class="ui-input-base-content ui-select__content" position="popper">
        <SelectViewport>
          <FormOptionItem v-for="(item, index) of items" :key="index" mode="select" :item="item" />
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
