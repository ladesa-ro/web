<script setup lang="ts">
defineProps<{
  handleConfirmButtonClick: (args?: any) => void;
  changeActivityValue?: 'aula' | 'vago';
  disableConfirmButton?: boolean;
}>();

const open = defineModel<boolean>();
</script>

<template>
  <UIPopover v-model="open" disable-animation arrow>
    <template #activator>
      <slot name="activator" />
    </template>

    <div
      class="popover-edit u-flex u-flex-col u-gap-4 u-rounded-lg u-p-2-5"
    >
      <slot />

      <div class="u-flex u-justify-between u-gap-3">
        <UIButtonModalCancel variant="small" @click="open = !open" />

        <UIButtonModalConfirm
          variant="small"
          :disabled="disableConfirmButton"
          @click="
            () => {
              if (changeActivityValue) {
                handleConfirmButtonClick(changeActivityValue);
              }
              open = !open;
            }
          "
        />
      </div>
    </div>
  </UIPopover>
</template>

<style scoped>
.popover-edit {
  border: 2px solid var(--ladesa-green-1-color);
  background-color: var(--ladesa-background-color);
}

@media (min-width: 640px) {
  .popover-edit {
    width: 19rem;
  }
}
</style>
