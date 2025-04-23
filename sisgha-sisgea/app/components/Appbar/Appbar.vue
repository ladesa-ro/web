<script lang="ts" setup>
const hamburgerActive = defineModel<boolean>({
  required: true,
});

function toggleHamburger() {
  hamburgerActive.value = !hamburgerActive.value;
}

//

const notificationsButtonEl = ref(null);
</script>

<template>
  <header
    class="flex items-center w-full max-sm:pr-5 sm:pr-8 h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
  >
    <div
      class="m-[0.34375rem] cursor-pointer shrink-0"
      @click="toggleHamburger"
    >
      <IconsMenuIconHamburgerOn
        v-if="hamburgerActive"
        class="p-3 w-[2.813rem]"
      />
      <IconsMenuIconHamburgerOff v-else class="p-3 w-[2.813rem]" />
    </div>

    <AppbarProfileCardChangeProfileCard />

    <div class="flex-1" />

    <AppbarChangeThemeVueChangeTheme class="shrink-0" />

    <UIPopover>
      <template #activator>
        <IconsIconNotifications
          ref="notificationsButtonEl"
          class="w-[2.25rem] p-2 cursor-pointer shrink-0"
        />
      </template>

      <AppbarSpeechBubbles :notifications-button-el="notificationsButtonEl" />
    </UIPopover>

    <div class="sm:mr-3" />

    <div class="hidden sm:block">
      <LogoSisghaLogomarca
        class="m-0 h-0 sm:w-[8.75rem] cursor-pointer shrink-0"
      />
    </div>
  </header>
</template>
