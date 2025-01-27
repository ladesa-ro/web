<script setup>
const isActive = ref(false);
</script>

<template>
  <DialogSkeleton v-model="isActive">
    <template #activator>
      <span class="text-ldsa-text-green cursor-pointer inline">
        Clique aqui.
      </span>
    </template>

    <SectionLoginResetPasswordForm @close="isActive = false" />
  </DialogSkeleton>
</template>