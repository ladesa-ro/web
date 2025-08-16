<script setup lang="ts">
import { type AcceptableValue } from 'reka-ui';

type Props = { title: string; items: ParsedItem[]; disabled?: boolean, loading?: boolean, open?: boolean };
const {open: openProps} =  defineProps<Props>();

defineEmits(['option-selected']);

const selectedOption = defineModel<AcceptableValue>({ required: true });

//

const open = ref(openProps);
</script>

<template>
  <UICollapsible
    v-model="open"
    :disabled
    class="border-2 rounded-lg"
    :class="open && !disabled ? 'border-ldsa-green-2' : 'border-ldsa-grey'"
  >
    <template #trigger>
      <div
        class="p-4 flex justify-between items-center text-lg font-semibold"
        :class="
          disabled
            ? 'text-ldsa-grey cursor-not-allowed'
            : 'text-ldsa-text-default'
        "
      >
        {{ title }}

        <IconsArrow
          class="transition-[rotate] duration-200"
          :class="[
            open ? 'rotate-90' : '-rotate-90',
            disabled ? 'text-ldsa-grey' : 'text-ldsa-text-green',
          ]"
        />
      </div>
    </template>

    <div
      class="m-4 mt-0 h-15 max-w-full min-w-0 whitespace-nowrap overflow-x-auto overflow-y-hidden"
    >
      <SectionConsultaAccordionOptions
        @option-selected="
          itemSelected => $emit('option-selected', { itemSelected, title })
        "
        v-model="selectedOption"
        :items
      />
    </div>
  </UICollapsible>
</template>

<style scoped>
div > div#overflow-auto {
  overflow-x: auto !important;
}
</style>
