<script lang="ts" setup>
const { isDark, changeTheme } = useCustomTheme();
</script>

<template>
  <button class="p-2.5" @pointerdown="changeTheme">
    <IconsColorThemeMoon v-if="isDark" />
    <IconsColorThemeSun v-else />
  </button>
</template>
