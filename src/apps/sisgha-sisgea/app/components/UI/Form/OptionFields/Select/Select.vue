<script lang="ts" setup>
import {
  FormSelect,
  type FormSelectProps,
  type ParsedOptionItem,
} from '@ladesa-ro/web.ui';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<FormSelectProps>(), {
  multipleOptions: false,
});

const selectedItem = defineModel<ParsedOptionItem>({
  required: false,
  default: undefined,
});
</script>

<template>
  <FormSelect
    v-model="selectedItem"
    v-bind="$attrs"
    :items="props.items"
    :label="props.label"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :multiple-options="props.multipleOptions"
  />
</template>
