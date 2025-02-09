<script setup lang="ts">
import { useCreateOrManageControlContext } from '../useCreateOrManageControlContext';

type Props = {
  titleEdit: string;
  titleCreate: string;
};

defineProps<Props>();

const {
  methods: { onFinish, onDelete },
  state: { mode, isLoading, isBusy },
} = useCreateOrManageControlContext();
</script>

<template>
  <FormsCreateOrManageBaseForm
    :titleEdit="titleEdit"
    :titleCreate="titleCreate"
    :mode="mode"
    :isBusy="isBusy"
    :isLoading="isLoading"
    :onClose="onFinish"
    :onDelete="onDelete"
  >
    <slot />
  </FormsCreateOrManageBaseForm>
</template>
