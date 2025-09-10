<script setup lang="ts">
defineProps<{
  handleConfirmButtonClick: any ;
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
      class="flex flex-col gap-3 border-2 border-ldsa-green-1 rounded-lg p-2.5 bg-ldsa-bg"
    >
      <slot />

      <div class="flex justify-between gap-3">
        <UIButtonModalCancel variant="small" @click="open = !open" />

        <UIButtonModalConfirm
          variant="small"
          :disabled="disableConfirmButton"
          @click="
            () => {
              handleConfirmButtonClick();
              open = !open;
            }
          "
        />
      </div>
    </div>
  </UIPopover>
</template>
