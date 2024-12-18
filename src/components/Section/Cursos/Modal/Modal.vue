<script lang="ts" setup>
import { ref } from 'vue';

//

type Props = {
  editId?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  editId: null,
});

//

const editId = toRef(props, 'editId');

const isActive = ref(false);
</script>

<template>
  <v-dialog v-model="isActive" max-width="500">
    <template #activator="{ props: activatorProps }">
      <UIButtonAdd v-if="editId === null" v-bind="activatorProps" />
      <UIButtonEdit v-else v-bind="activatorProps" />
    </template>

    <template v-slot:="{ isActive }">
      <v-card class="dialog-style">
        <SectionCursosForm :edit-id="editId" @close="isActive.value = false" />
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: solid 2px #9ab69e;
}
</style>
