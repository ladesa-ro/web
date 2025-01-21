<script lang="ts" setup>
type Props = {
  editId?: string | null;
  formComponent: Component<
    { editId?: string | null },
    any,
    any,
    any,
    any,
    ['close']
  >;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

const editId = toRef(props, 'editId');

//

const isActive = ref(false);

function onClose() {
  isActive.value = false;
}

function onOpen() {
  isActive.value = true;
}
</script>

<template>
  <DialogSkeleton :is-active="isActive" :onOpen="onOpen" :onClose="onClose">
    <template #activator>
      <UIButtonAdd v-if="!editId" @click="onOpen" />
      <UIButtonEdit v-else @click="onOpen" />
    </template>

    <component :is="formComponent" :edit-id="editId" @close="onClose" />
  </DialogSkeleton>
</template>
