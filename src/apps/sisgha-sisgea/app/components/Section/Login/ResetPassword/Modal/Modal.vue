<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
const isActive = ref(false);
</script>

<template>
  <DialogSkeleton v-model="isActive" :disabled>
    <template #activator>
      <span
        class="reset-password-trigger"
        :class="
          disabled
            ? 'reset-password-trigger--disabled'
            : 'reset-password-trigger--enabled'
        "
        @click="isActive = true"
      >
        Clique aqui.
      </span>
    </template>

    <SectionLoginResetPasswordForm @close="isActive = false" />
  </DialogSkeleton>
</template>

<style scoped>
.reset-password-trigger {
  display: inline;
  color: var(--ladesa-text-green-color);
}

.reset-password-trigger--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-password-trigger--enabled {
  cursor: pointer;
}

.reset-password-trigger--enabled:hover {
  text-decoration: underline !important;
}
</style>
