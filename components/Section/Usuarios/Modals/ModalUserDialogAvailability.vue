<script setup lang="ts">
import FormUserAvailability from '../Form/FormUserAvailabilities.vue';
import {
  checkHasAtLeastOneActiveTeacherRole,
  useFormUser,
} from '../Form/FormUserUtils';

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
    <FormUserAvailability close="isActive.value = false" />
  </v-card>
</template>
