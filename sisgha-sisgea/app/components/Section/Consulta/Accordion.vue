<script setup lang="ts" generic="T extends AcceptableValue">
import type { AcceptableValue } from 'reka-ui';

type Props = {
  title: string;
  items: ParsedItem[];
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
};

defineProps<Props>();

defineEmits(['option-selected']);

const selectedOption = defineModel<T>('selectedOption', {
  required: true,
});

const open = defineModel<boolean>('open', {
  default: false,
});

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
        class="p-3 sm:p-4 flex justify-between items-center sm:text-lg font-semibold"
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
      class="m-3 mt-0 sm:m-4 sm:mt-0 max-w-full min-w-0 whitespace-nowrap overflow-x-auto overflow-y-hidden"
    >
      <div v-if="loading">Carregando...</div>

      <div v-else-if="error">Ocorreu um erro inesperado.</div>

      <template v-else>
        <div v-if="items.length === 0"> Nenhum resultado encontrado.</div>

        <SectionConsultaAccordionOptions
        v-else
        @option-selected="
          itemSelected => $emit('option-selected', { itemSelected, title })
        "
        v-model="selectedOption"
        :items="items"
        :loading
        :error
      />
      </template>
    </div>
  </UICollapsible>
</template>
