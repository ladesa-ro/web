<script lang="ts" setup generic="T extends AcceptableValue">
import type { AcceptableValue } from 'reka-ui';
import AccordionOptions from './AccordionOptions.vue';
import Collapsible from './Collapsible.vue';
import IconArrowArrow from '../icons/Arrow/Arrow.vue';
import type { ParsedOptionItem } from './option-item';

export type AccordionSelectProps = {
  title: string;
  items: ParsedOptionItem[];
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
};

defineProps<AccordionSelectProps>();

defineEmits(['option-selected']);

const selectedOption = defineModel<T>('selectedOption', {
  required: true,
});

const open = defineModel<boolean>('open', {
  default: false,
});
</script>

<template>
  <Collapsible
    v-model="open"
    :disabled
    class="ui-accordion-select"
    :class="
      open && !disabled
        ? 'ui-accordion-select--open'
        : 'ui-accordion-select--closed'
    "
  >
    <template #trigger>
      <div
        class="ui-accordion-select__trigger u-flex u-justify-between u-items-center u-font-semibold"
        :class="
          disabled
            ? 'ui-accordion-select__trigger--disabled'
            : 'ui-accordion-select__trigger--enabled'
        "
      >
        {{ title }}

        <IconArrowArrow
          class="ui-accordion-select__arrow"
          :class="[
            open
              ? 'ui-accordion-select__arrow--open'
              : 'ui-accordion-select__arrow--closed',
            disabled
              ? 'ui-accordion-select__arrow--disabled'
              : 'ui-accordion-select__arrow--enabled',
          ]"
        />
      </div>
    </template>

    <div class="ui-accordion-select__content">
      <div v-if="loading">Carregando...</div>

      <div v-else-if="error">Ocorreu um erro inesperado.</div>

      <template v-else>
        <div v-if="items.length === 0">Nenhum resultado encontrado.</div>

        <AccordionOptions
          v-else
          v-model="selectedOption"
          :items="items"
          :loading
          :error
          @option-selected="
            itemSelected => $emit('option-selected', { itemSelected, title })
          "
        />
      </template>
    </div>
  </Collapsible>
</template>
