<script lang="ts" setup>
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
    :isBusy="isBusy"
    :isLoading="isLoading"
    :mode="mode"
    :onClose="onFinish"
    :onDelete="onDelete"
    :titleCreate="titleCreate"
    :titleEdit="titleEdit"
  >
    <slot />
  </FormsCreateOrManageBaseForm>
</template>
