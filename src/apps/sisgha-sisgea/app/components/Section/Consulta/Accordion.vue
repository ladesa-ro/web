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
    class="consulta-accordion"
    :class="
      open && !disabled
        ? 'consulta-accordion--open'
        : 'consulta-accordion--closed'
    "
  >
    <template #trigger>
      <div
        class="u-flex u-justify-between u-items-center u-font-semibold consulta-accordion__trigger"
        :class="
          disabled
            ? 'consulta-accordion__trigger--disabled'
            : 'consulta-accordion__trigger--enabled'
        "
      >
        {{ title }}

        <IconsArrow
          class="consulta-accordion__arrow"
          :class="[
            open
              ? 'consulta-accordion__arrow--open'
              : 'consulta-accordion__arrow--closed',
            disabled
              ? 'consulta-accordion__arrow--disabled'
              : 'consulta-accordion__arrow--enabled',
          ]"
        />
      </div>
    </template>

    <div class="consulta-accordion__content">
      <div v-if="loading">Carregando...</div>

      <div v-else-if="error">Ocorreu um erro inesperado.</div>

      <template v-else>
        <div v-if="items.length === 0">Nenhum resultado encontrado.</div>

        <SectionConsultaAccordionOptions
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
  </UICollapsible>
</template>

<style scoped>
.consulta-accordion {
  border: 2px solid var(--ladesa-grey-color);
  border-radius: var(--ui-radius-lg);
}

.consulta-accordion--open {
  border-color: var(--ladesa-green-2-color);
}

.consulta-accordion__trigger {
  padding: var(--ui-space-3);
}

@media (min-width: 640px) {
  .consulta-accordion__trigger {
    padding: var(--ui-space-4);
    font-size: 1.125rem;
  }
}

.consulta-accordion__trigger--disabled {
  color: var(--ladesa-grey-color);
  cursor: not-allowed;
}

.consulta-accordion__trigger--enabled {
  color: var(--ladesa-text-default-color);
}

.consulta-accordion__arrow {
  transition: transform var(--ui-duration-base) var(--ui-easing-standard);
}

.consulta-accordion__arrow--open {
  transform: rotate(90deg);
}

.consulta-accordion__arrow--closed {
  transform: rotate(-90deg);
}

.consulta-accordion__arrow--disabled {
  color: var(--ladesa-grey-color);
}

.consulta-accordion__arrow--enabled {
  color: var(--ladesa-text-green-color);
}

.consulta-accordion__content {
  margin: var(--ui-space-3);
  margin-top: 0;
  max-width: 100%;
  min-width: 0;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}

@media (min-width: 640px) {
  .consulta-accordion__content {
    margin: var(--ui-space-4);
    margin-top: 0;
  }
}
</style>
