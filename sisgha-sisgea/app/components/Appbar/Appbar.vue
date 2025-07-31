<script lang="ts" setup>
import AppbarCampus from './AppBarCampus/AppbarCampus.vue';

const hamburgerActive = defineModel<boolean>({
  required: true,
});

function toggleHamburger() {
  hamburgerActive.value = !hamburgerActive.value;
}
</script>

<template>
  <header
    class="flex items-center w-full max-[345px]:pr-1.5 pr-3 sm:pr-7 h-14 sm:h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
  >
    <button class="m-[0.34375rem] shrink-0" @click="toggleHamburger">
      <IconsMenuHamburgerOn v-if="hamburgerActive" class="p-3 w-[2.813rem]" />
      <IconsMenuHamburgerOff v-else class="p-3 w-[2.813rem] h-full" />
    </button>

    <AppbarProfileCardChangeProfileCard />

    <div class="flex-1" />

    <AppbarCampus />

    <AppbarChangeThemeVueChangeTheme class="shrink-0 sm:mr-3" />

    <div class="hidden sm:block">
      <LogoSisghaLogomarca class="w-[8.75rem] cursor-pointer shrink-0" />
    </div>
  </header>
</template>
