<script lang="ts" setup>
import AppbarCampus from './AppBarCampus/AppbarCampus.vue';

const hamburgerActive = defineModel<boolean>({
  required: true,
});

function toggleHamburger() {
  hamburgerActive.value = !hamburgerActive.value;
}

//

const notificationsOpen = ref(false);
</script>

<template>
  <header
    class="flex items-center w-full max-[345px]:pr-2 max-sm:pr-4 sm:pr-7 h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
  >
    <button class="m-[0.34375rem] shrink-0" @click="toggleHamburger">
      <IconsMenuHamburgerOn
        v-if="hamburgerActive"
        class="p-3 w-[2.813rem]"
      />
      <IconsMenuHamburgerOff v-else class="p-3 w-[2.813rem] h-full" />
    </button>

    <AppbarProfileCardChangeProfileCard />

    <div class="flex-1" />

    <AppbarCampus />

    <AppbarChangeThemeVueChangeTheme
      class="shrink-0 max-[345px]:mr-0.5 max-sm:mr-2"
    />

    <UIPopover popover-arrow v-model="notificationsOpen">
      <template #activator>
        <IconsNotifications
          ref="notificationsButtonEl"
          class="w-[2.25rem] p-2"
        />
      </template>

      <AppbarNotifications />
    </UIPopover>

    <div class="sm:mr-3" />

    <div class="hidden sm:block">
      <LogoSisghaLogomarca class="w-[8.75rem] cursor-pointer shrink-0" />
    </div>
  </header>
</template>
