<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  editId: {
    type: String,
    default: null,
    required: false,
  },
});

const editId = toRef(props, 'editId');

const isActive = ref(false);
</script>

<template>
  <v-dialog v-model="isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <UIButtonAdd v-bind="activatorProps" />
    </template>

    <template v-slot:="{ isActive }">
      <SectionUsuariosForm>
        <div
          class="flex flex-row justify-center p-1 gap-[16px] overflow-hidden"
        >
          <v-card class="dialog-style p-1 overflow-auto max-w-[500px]">
            <SectionUsuariosFormProfile
              :editId="editId"
              @close="isActive.value = false"
            />
          </v-card>

          <SectionUsuariosModalsFormDialogAvailability />
        </div>
      </SectionUsuariosForm>
    </template>
  </v-dialog>
</template>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
}

.detail {
  cursor: pointer;
  z-index: 10;
  margin-right: 16px;
}
</style>
