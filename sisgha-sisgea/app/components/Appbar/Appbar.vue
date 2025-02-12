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
    class="flex items-center w-full h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
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

    <AppbarChangeThemeVueChangeTheme />

    <UIPopover>
      <template #activator>
        <IconsIconNotifications
          ref="notificationsButtonEl"
          class="w-[2.25rem] p-2 cursor-pointer"
        />
      </template>

      <AppbarSpeechBubbles :notifications-button-el="notificationsButtonEl" />
    </UIPopover>

    <div class="mr-3" />

    <LogoSisghaLogomarca
      class="mr-8 w-[8.75rem] hidden sm:block cursor-pointer shrink-0"
    />
  </header>
</template>
