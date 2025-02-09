<script setup lang="ts">
import {
  SelectContent as Content,
  SelectPortal as Portal,
  SelectRoot,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectViewport as Viewport,
} from 'radix-vue';

type Props = {
  options: Array<any> | Object;
  placeholder: string;
  label: string;
};

const { options } = defineProps<Props>();

const selectedItem = ref();

const open = ref();

const triggerFocus = ref(false);
</script>

<template>
  <SelectRoot
    v-model="selectedItem"
    v-model:open="open"
    class="w-full overflow-hidden"
  >
    <Trigger
      :class="[
        'relative flex justify-between items-center w-full h-12 px-3 py-1.5 border-2 rounded-lg',
        'font-medium text-left text-ldsa-text-default data-[placeholder]:text-ldsa-grey focus:border-ldsa-green-2',
        open ? 'border-ldsa-green-2' : 'border-ldsa-grey',
      ]"
      @focus="triggerFocus = true"
      @blur="triggerFocus = false"
    >
      <label
        class="absolute inline bottom-9 bg-ldsa-bg px-1.5 text-[0.813rem] font-medium"
        :class="triggerFocus || open ? 'text-ldsa-green-2' : 'text-ldsa-grey'"
      >
        {{ label }}
      </label>

      <Value :placeholder="placeholder" />

      <IconsArrowIconArrow
        class="mr-1 p-[0.063rem] text-ldsa-text-green transition-transform duration-[250ms]"
        :class="open ? 'rotate-90' : '-rotate-90'"
      />
    </Trigger>

    <Portal>
      <Content
        position="popper"
        class="overflow-hidden w-(--radix-select-trigger-width) shadow-[0_0_10px_rgba(0,0,0,0.4)] rounded-lg bg-ldsa-bg"
      >
        <Viewport>
          <UISelectBaseSelectItem
            v-for="(option, index) in options"
            :value="option"
            :key="index"
          />
        </Viewport>
      </Content>
    </Portal>
  </SelectRoot>
</template>
