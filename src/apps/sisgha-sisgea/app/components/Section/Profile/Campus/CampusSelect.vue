<script lang="ts" setup>
import {
  ComboboxAnchor as Anchor,
  ComboboxRoot as AutocompleteRoot,
  ComboboxInput as Input,
  ComboboxTrigger as Trigger,
} from 'reka-ui';
import { computed, ref } from 'vue';
import { IconsArrow, IconsIconLocale } from '#components';

type CampusItem = { label: string; value: string };

const props = defineProps<{
  campi: CampusItem[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const search = ref('');
const open = ref(false);

const moreThanOneCampus = computed(() => props.campi.length > 1);
const selectedLabel = computed(
  () =>
    props.campi.find(c => c.value === props.modelValue)?.label ?? 'Sem campus'
);
</script>

<template>
  <div>
    <div v-if="moreThanOneCampus" class="campus-select__wrapper">
      <AutocompleteRoot
        v-model:open="open"
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
      >
        <Anchor class="input">
          <IconsIconLocale class="campus-select__pin-icon" />

          <Input
            v-model="search"
            placeholder="Selecione um campus"
            class="campus-select__input"
            :display-value="
              value => props.campi.find(i => i.value === value)?.label || ''
            "
          />

          <Trigger>
            <IconsArrow
              class="campus-select__trigger-icon"
              :class="[
                open
                  ? 'campus-select__trigger-icon--open'
                  : 'campus-select__trigger-icon--closed',
              ]"
            />
          </Trigger>
        </Anchor>

        <SectionProfileCampusOptions :campi="props.campi" />
      </AutocompleteRoot>
    </div>

    <div v-else class="input u-flex u-items-center">
      <IconsIconLocale class="campus-select__pin-icon" />
      <span class="campus-select__selected-label u-font-medium u-text-center">{{
        selectedLabel
      }}</span>
    </div>
  </div>
</template>

<style scoped>
.campus-select__wrapper {
  width: auto;
}

.campus-select__pin-icon {
  width: 0.5rem;
  height: 0.5rem;
  color: var(--ladesa-green-1-color);
  margin-right: var(--ui-space-1);
}

.campus-select__input {
  text-align: center;
  width: auto;
  height: 100%;
  font-size: 0.6rem;
  flex-shrink: 1;
  max-width: fit-content;
}

.campus-select__trigger-icon {
  width: 0.625rem !important;
  height: 0.625rem !important;
  color: var(--ladesa-green-1-color);
  transition: transform var(--ui-duration-base);
}

.campus-select__trigger-icon--open {
  transform: rotate(90deg);
}

.campus-select__trigger-icon--closed {
  transform: rotate(-90deg);
}

.campus-select__selected-label {
  font-size: 0.6rem;
}

.input {
  position: relative;
  display: flex;
  border: 2px solid var(--ladesa-grey-color);
  border-radius: var(--ui-radius-lg);
  height: 1.75rem;
  min-height: 0;
  padding-inline: var(--ui-space-2);
  max-width: 10.25rem;
  font-size: 0.875rem;
  font-weight: var(--ui-font-weight-medium);
  text-align: center;
  color: var(--ladesa-text-default-color);
}

.input[data-placeholder] {
  color: rgb(from var(--ladesa-grey-color) R G B / 90%);
}

.input:focus-within {
  border-color: var(--ladesa-green-2-color);
}

.input:focus-visible {
  outline: none;
}

.input:disabled {
  cursor: not-allowed;
}

.input:is([data-open], [data-state='open'], :focus-within) {
  border-color: var(--ladesa-green-2-color);
}

.input ::placeholder {
  font-weight: var(--ui-font-weight-medium);
  color: var(--ladesa-grey-color);
}

.input:has(input[disabled]) {
  opacity: 0.6;
}
</style>
