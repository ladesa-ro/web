<script setup lang="ts">
import {
  Label,
  SelectContent,
  SelectGroup,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue';

type Props = {
  options: Array<any> | Object;
  placeholder: string;
};

const { options } = defineProps<Props>();

const selectedItem = ref();

const open = ref();
</script>

<template>
  <SelectRoot
    v-model="selectedItem"
    v-model:open="open"
    class="w-full overflow-hidden"
  >
    <SelectTrigger
      :class="[
        'flex justify-between items-center w-full h-12 px-3 py-1.5 border-2 border-ldsa-grey rounded-lg',
        'font-medium text-left text-ldsa-text-default data-[placeholder]:text-ldsa-grey',
      ]"
    >
      <SelectValue :placeholder="placeholder" />
      <IconsArrowIconArrow
        class="mr-1 p-[0.063rem] text-ldsa-text-green transition-transform duration-[250ms]"
        :class="open ? 'rotate-90' : '-rotate-90'"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        position="popper"
        class="overflow-hidden w-(--radix-select-trigger-width) shadow-[0_0_10px_rgba(0,0,0,0.4)] rounded-lg bg-ldsa-bg"
      >
        <SelectViewport>
          <SelectGroup>
            <UISelectBaseSelectItem
              v-for="(option, index) in options"
              :value="option"
              :key="index"
            />
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
