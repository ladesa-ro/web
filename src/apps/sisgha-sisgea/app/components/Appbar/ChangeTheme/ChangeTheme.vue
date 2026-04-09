<script lang="ts" setup>
const { isDark, changeTheme } = useCustomTheme();
</script>

<template>
  <button class="p-2.5" @pointerdown="changeTheme">
    <ClientOnly>
      <IconsColorThemeMoon v-if="isDark" />
      <IconsColorThemeSun v-else />
      <template #fallback>
        <div
          class="w-[22px] h-[23px] rounded-full animate-pulse bg-current opacity-20"
        />
      </template>
    </ClientOnly>
  </button>
</template>
