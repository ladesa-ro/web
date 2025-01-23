<script setup>
const isActive = ref(false);
</script>

<template>
  <v-dialog v-model="isActive" class="" max-width="450">
    <template #activator="{ props: activatorProps }">
      <span class="text-ldsa-text-green cursor-pointer" v-bind="activatorProps">
        Clique aqui.
      </span>
    </template>

    <template v-slot:="{ isActive }">
      <v-card class="dialog-style">
        <SectionLoginResetPasswordForm @close="isActive.value = false" />
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.dialog-style {
  border-radius: 14px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @apply border-2 border-ldsa-grey;
}
</style>
