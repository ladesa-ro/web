<script setup lang="ts">
defineProps<{ disabled?: boolean }>();
const isActive = ref(false);
</script>

<template>
  <DialogSkeleton v-model="isActive" :disabled>
    <template #activator>
      <span
        class="text-ldsa-text-green inline"
        :class="
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:underline! cursor-pointer'
        "
        @click="isActive = true"
      >
        Clique aqui.
      </span>
    </template>

    <SectionLoginResetPasswordForm @close="isActive = false" />
  </DialogSkeleton>
</template>
