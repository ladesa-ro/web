<script setup lang="ts">
import SpeechBubbles from './SpeechBubbles/SpeechBubbles.vue';

const { isDark, changeTheme } = useCustomTheme();

//

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
  <div
    class="flex items-center w-full h-[4.563rem] border-b-[1px] border-ldsa-grey/50 bg-ldsa-bg"
  >
    <!-- ========== menu icon configurations ========== -->
    <div class="m-[0.34375rem] cursor-pointer" @click="toggleHamburger">
      <IconsMenuIconHamburgerOn v-if="hamburgerActive" class="p-3 w-[45px]" />
      <IconsMenuIconHamburgerOff v-else class="p-3 w-[45px]" />
    </div>
    <!-- ========= / menu icon configurations ========= -->

    <!-- =================== user ==================== -->
    <!-- configuration to show the modal-->
    <AppbarProfileCardChangeProfileCard />
    <!-- ================== / user ================== -->

    <div class="flex-1" />

    <!-- ========= button change color theme ======== -->
    <button class="mr-2.5" @click="changeTheme">
      <template v-if="isDark">
        <IconsColorThemeIconMoon />
      </template>
      <template v-else>
        <IconsColorThemeIconSun />
      </template>
    </button>
    <!-- ======== / button change color theme ======== -->

    <!-- ============ notifications icon ============ -->
    <v-menu
      origin="auto"
      location="bottom center"
      transition="slide-y-transition"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <IconsIconNotifications
          v-bind="props"
          ref="notificationsButtonEl"
          class="cursor-pointer p-2 w-[38px] h-[38px]"
        />
      </template>

      <!-- modal that will be shown if the icon is clicked -->
      <SpeechBubbles :notifications-button-el="notificationsButtonEl" />
    </v-menu>
    <!-- =========== / notifications icon =========== -->

    <div class="mr-3" />

    <!-- SISGHA logo-->
    <LogoSisghaLogomarca
      class="cursor-pointer mr-8 w-[140px] hidden sm:block"
    />
  </div>
</template>
