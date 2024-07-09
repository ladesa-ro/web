<script setup lang="ts">
import {
  checkHasAtLeastOneActiveTeacherRole,
  useFormUser,
} from '../../../Form/FormUserUtils';

const { values: formValues } = useFormUser();

const hasAtLeastOneActiveTeacherRole = computed(() => {
  return checkHasAtLeastOneActiveTeacherRole(formValues.vinculos);
});
</script>

<template>
  <v-card
    v-if="hasAtLeastOneActiveTeacherRole"
    class="dialog-style overflow-auto max-w-[500px]"
  >
    <SectionUsuariosFormAvailabilities />
  </v-card>
</template>
