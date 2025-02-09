<script setup lang="ts">
import {
  checkHasAtLeastOneActiveTeacherRole,
  useFormUser,
} from '../../../Form/FormUtils';

const { values: formValues } = useFormUser();

const hasAtLeastOneActiveTeacherRole = computed(() => {
  return checkHasAtLeastOneActiveTeacherRole(formValues.vinculos);
});
</script>

<template>
  <SectionUsuariosFormAvailabilities v-if="hasAtLeastOneActiveTeacherRole" />
</template>
