<script setup lang="ts">
import { CheckboxIndicator as Check, CheckboxRoot as Checkbox } from 'reka-ui';

type Props = {
  item: ParsedItem;
  active: boolean;
  disabled?: boolean;
  truncateText?: boolean;
  enterHandle?: (item: ParsedItem) => void;
};
const {enterHandle = () => {}, disabled = false, truncateText = false} = defineProps<Props>();
</script>

<template>
  <span
    class="rounded-full checkbox-shadow focus-within:shadow-(--green-shadow) hover:shadow-(--green-shadow)"
  >
    <Checkbox
      :value="item.value"
      :disabled="disabled ?? false"
      :class="[active ? 'border-ldsa-green-2' : 'border-ldsa-grey']"
      class="flex border-2 hover:bg-ldsa-green-2/10 rounded-sm w-5.5 h-5.5 focus-visible:outline-ldsa-green-2"
      @keyup.enter="enterHandle"
    >
      <Check class="flex-1 bg-ldsa-green-2 p-1 pt-1.5">
        <IconsConfirm class="text-ldsa-white" />
      </Check>
    </Checkbox>
  </span>
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
