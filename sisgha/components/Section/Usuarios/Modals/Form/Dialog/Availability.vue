<script setup lang="ts">
import {
  checkHasAtLeastOneActiveTeacherRole,
  useFormUser,
} from '../../../Form/FormUtils';

const { values: formValues } = useFormUser();

const hasAtLeastOneActiveTeacherRole = computed(() => {
  return checkHasAtLeastOneActiveTeacherRole(formValues.perfis);
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
