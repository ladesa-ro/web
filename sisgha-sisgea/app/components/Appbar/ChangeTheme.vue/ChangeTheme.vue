<script lang="ts" setup>
const { isDark, changeTheme } = useCustomTheme();
</script>

<template>
  <button class="p-2.5" @click="changeTheme">
    <IconsColorThemeIconMoon v-if="isDark" />
    <IconsColorThemeIconSun v-else />
  </button>
</template>
