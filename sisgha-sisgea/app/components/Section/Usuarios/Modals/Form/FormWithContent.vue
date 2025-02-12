<script lang="ts" setup>
type Props = {
  editId?: string | null;
};
const { editId = null } = defineProps<Props>();

//

const $emit = defineEmits(['close']);

function onClose() {
  $emit('close');
}
</script>

<template>
  <SectionUsuariosForm :edit-id="editId">
    <SectionUsuariosFormProfile :edit-id="editId" @close="onClose" />

    <SectionUsuariosModalsFormDialogAvailability />
  </SectionUsuariosForm>
</template>
