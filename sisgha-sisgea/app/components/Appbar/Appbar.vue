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
    class="flex items-center w-full max-[345px]:pr-2 max-sm:pr-4 min-sm:pr-7 h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
  >
    <button class="m-[0.34375rem] shrink-0" @click="toggleHamburger">
      <IconsMenuIconHamburgerOn
        v-if="hamburgerActive"
        class="p-3 w-[2.813rem]"
      />
      <IconsMenuIconHamburgerOff v-else class="p-3 w-[2.813rem] h-full" />
    </button>

    <AppbarProfileCardChangeProfileCard />

    <div class="flex-1" />

    <AppbarChangeThemeVueChangeTheme
      class="shrink-0 max-[345px]:mr-0.5 max-sm:mr-2"
    />

    <UIPopover>
      <template #activator>
        <IconsIconNotifications
          ref="notificationsButtonEl"
          class="w-[2.25rem] p-2 cursor-pointer"
        />
      </template>

      <AppbarSpeechBubbles :notifications-button-el="notificationsButtonEl" />
    </UIPopover>

    <div class="min-sm:mr-3" />

    <div class="hidden min-sm:block">
      <LogoSisghaLogomarca class="w-[8.75rem] cursor-pointer shrink-0" />
    </div>
  </header>
</template>
