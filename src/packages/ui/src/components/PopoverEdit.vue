<script lang="ts" setup>
import ButtonModalCancel from './ButtonModalCancel.vue';
import ButtonModalConfirm from './ButtonModalConfirm.vue';
import Popover from './Popover.vue';

export type PopoverEditActivity = 'aula' | 'vago';

export type PopoverEditProps = {
  handleConfirmButtonClick: (args: PopoverEditActivity) => void;
  changeActivityValue?: PopoverEditActivity;
  disableConfirmButton?: boolean;
};

const props = defineProps<PopoverEditProps>();

const open = defineModel<boolean>();

const confirm = () => {
  if (props.changeActivityValue) {
    props.handleConfirmButtonClick(props.changeActivityValue);
  }

  open.value = !open.value;
};
</script>

<template>
  <Popover v-model="open" disable-animation arrow>
    <template #activator>
      <slot name="activator" />
    </template>

    <div class="ui-popover-edit u-flex u-flex-col u-gap-4 u-rounded-lg u-p-2-5">
      <slot />

      <div class="u-flex u-justify-between u-gap-3">
        <ButtonModalCancel variant="small" @click="open = !open" />

        <ButtonModalConfirm
          variant="small"
          :disabled="disableConfirmButton"
          @click="confirm"
        />
      </div>
    </div>
  </Popover>
</template>
