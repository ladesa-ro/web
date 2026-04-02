<script lang="ts" setup>
defineProps<{
  to?: string;
}>();
</script>

<template>
  <div class="flex items-center">
    <slot />
    <nuxt-link
      v-if="to"
      :to="to"
      class="flex p-1.5 rounded-lg transition-colors hover:bg-ldsa-grey/20"
    >
      <IconsEyeOn class="w-5 h-5 text-ldsa-text-default" />
    </nuxt-link>
  </div>
</template>
