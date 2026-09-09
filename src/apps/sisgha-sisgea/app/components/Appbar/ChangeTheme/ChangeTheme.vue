<script lang="ts" setup>
const { isDark, changeTheme } = useCustomTheme();
</script>

<template>
  <button class="u-p-2-5" @pointerdown="changeTheme">
    <ClientOnly>
      <IconsColorThemeMoon v-if="isDark" />
      <IconsColorThemeSun v-else />
      <template #fallback>
        <div class="u-rounded-full theme-toggle-skeleton" />
      </template>
    </ClientOnly>
  </button>
</template>

<style scoped>
.theme-toggle-skeleton {
  width: 22px;
  height: 23px;
  background-color: currentColor;
  opacity: 0.2;
  animation: theme-toggle-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1)
    infinite;
}

@keyframes theme-toggle-skeleton-pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
