<script setup lang="ts">
import { type AcceptableValue } from 'reka-ui';

type Props = { title: string; items: ParsedItem[] };
defineProps<Props>();

// const items = useQuery();

const selectedOption = defineModel<AcceptableValue>({ required: true });

const open = ref(false);
</script>

<template>
  <UICollapsible
    v-model="open"
    class="border-2 rounded-lg"
    :class="open ? 'border-ldsa-green-2' : 'border-ldsa-grey'"
  >
    <template #trigger>
      <div class="p-4 flex justify-between items-center text-lg font-semibold">
        {{ title }}

        <IconsArrow
          class="text-ldsa-text-green transition-[rotate] duration-200"
          :class="open ? 'rotate-90' : '-rotate-90'"
        />
      </div>
    </template>

    <div class="m-4 mt-0 h-15 max-w-full min-w-0 whitespace-nowrap overflow-x-auto overflow-y-hidden">
      <SectionConsultaAccordionOptions
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
