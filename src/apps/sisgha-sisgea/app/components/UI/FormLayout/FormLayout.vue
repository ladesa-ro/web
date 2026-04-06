<script lang="ts" setup>
import { FormMode } from '~/utils/constants';

type Props = {
  title: string;
  mode: FormMode;
  isBusy?: boolean;
  onClose: () => void;
  onDelete?: () => void;
};

const props = defineProps<Props>();

useProvideFormContext({
  isBusy: computed(() => !!props.isBusy),
  mode: computed(() => props.mode),
});
</script>

<template>
  <DialogModalBaseLayout :on-close="onClose" :title="title">
    <UILoading v-if="isBusy && !$slots.default" />
    <slot v-else />

    <template #button-group>
      <slot name="actions" :mode="mode" :is-busy="isBusy">
        <UIButtonModalCancel :disabled="isBusy" @click="onClose" />

        <template v-if="mode === FormMode.MANAGE">
          <UIButtonModalDelete
            v-if="onDelete"
            :disabled="isBusy"
            @click.prevent="onDelete"
          />
          <UIButtonModalEdit :disabled="isBusy" />
        </template>

        <template v-else>
          <UIButtonModalSave :disabled="isBusy" />
        </template>
      </slot>
    </template>
  </DialogModalBaseLayout>
</template>
