<script lang="ts" setup>
const hamburgerActive = defineModel<boolean>({
  required: true,
});
</script>

<template>
  <header
    class="flex items-center w-full max-[345px]:pr-1.5 pr-3 min-[740px]:pr-6.5 h-14 sm:h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
  >
    <button
      class="m-[0.34375rem] shrink-0"
      @pointerdown="hamburgerActive = !hamburgerActive"
    >
      <IconsMenuHamburgerOn v-if="hamburgerActive" class="p-3 w-[2.813rem]" />
      <IconsMenuHamburgerOff v-else class="p-3 w-[2.813rem] h-full" />
    </button>

    <AppbarProfileCardChangeProfileCard />

    <div class="flex-1" />

    <AppbarChangeCampus />

    <AppbarChangeTheme class="shrink-0 min-[740px]:mr-3" />

    <AppbarChangeSystem />
  </header>
</template>
