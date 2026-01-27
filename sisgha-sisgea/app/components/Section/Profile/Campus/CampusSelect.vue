<script lang="ts" setup>
import {
  ComboboxAnchor as Anchor,
  ComboboxRoot as AutocompleteRoot,
  ComboboxContent as Content,
  ComboboxInput as Input,
  ComboboxEmpty as NoResultsState,
  ComboboxPortal as Portal,
  ComboboxTrigger as Trigger,
  ComboboxViewport as Viewport,
} from 'reka-ui';
import { computed, ref } from 'vue';
import Arrow from '~/components/Icons/Arrow/Arrow.vue';
import IconsIconLocale from '~/components/Icons/IconLocale.vue';
import AutoCompleteItem from '../../../UI/Form/OptionFields/Item.vue';

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
    <template v-if="moreThanOneCampus">
      <div class="w-auto">
        <AutocompleteRoot
          :model-value="props.modelValue"
          @update:model-value="emit('update:modelValue', $event)"
          v-model:open="open"
        >
          <Anchor class="input">
            <IconsIconLocale class="w-2 h-2 text-ldsa-green-1 mr-1" />

            <Input
              v-model="search"
              placeholder="Selecione um campus"
              class="text-center w-auto h-full text-[0.6rem] shrink max-w-fit"
              :display-value="
                value => props.campi.find(i => i.value === value)?.label || ''
              "
            />

            <Trigger>
              <Arrow
                class="w-2.5! h-2.5!"
                :class="[
                  'text-ldsa-green-1 transition-transform duration-200',
                  open ? 'rotate-90' : 'rotate-270',
                ]"
              />
            </Trigger>
          </Anchor>

          <Portal>
            <Content
              class="input-base-content w-(--reka-combobox-trigger-width) z-[10000] bg-ldsa-bg rounded-lg shadow-lg"
              position="popper"
              side="bottom"
              align="start"
            >
              <Viewport class="text-[11px]">
                <NoResultsState
                  class="text-ldsa-grey font-normal px-3 py-2 min-h-[2.25rem] flex items-start"
                >
                  Nenhum resultado encontrado
                </NoResultsState>

                <AutoCompleteItem
                  v-for="campus in props.campi"
                  :key="campus.value"
                  :item="campus"
                  mode="autocomplete"
                />
              </Viewport>
            </Content>
          </Portal>
        </AutocompleteRoot>
      </div>
    </template>

    <template v-else>
      <div class="input flex items-center">
        <IconsIconLocale class="w-2 h-2 text-ldsa-green-1 mr-1" />
        <span class="text-[0.6rem] font-medium text-center">{{
          selectedLabel
        }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";
.input {
  @apply relative flex border-2 rounded-lg;
  @apply h-7 min-h-0 px-2 max-w-41 text-sm font-medium text-center text-ldsa-text-default data-[placeholder]:text-ldsa-grey/90;
  @apply focus-within:border-ldsa-green-2 focus-visible:outline-none disabled:cursor-not-allowed;
}

.input {
  @apply border-ldsa-grey;
}

.input:is([data-open], [data-state='open'], :focus-within) {
  @apply border-ldsa-green-2;
}

.input ::placeholder {
  @apply font-medium text-ldsa-grey;
}
.input:has(input[disabled]) {
  @apply opacity-60;
}
</style>
