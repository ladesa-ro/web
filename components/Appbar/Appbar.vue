<script setup lang="ts">
// import profilePicture from '~/assets/icons/profilePicture.svg';

import { ref } from 'vue';
import SpeechBubbles from './SpeechBubbles/SpeechBubbles.vue';

const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});

function toggleHamburger() {
  hamburgerActive.value = !hamburgerActive.value;
}

const notificationsButtonEl = ref(null);
</script>

<template>
  <div class="flex w-full items-center h-full bg-white">
    <!-- ========== menu icon configurations ========== -->
    <div class="m-[0.34375rem] cursor-pointer" @click="toggleHamburger">
      <!--m-[5.5px]-->
      <IconsMenuIconHamburgerOn class="pa-3 w-[45px]" v-if="hamburgerActive" />
      <IconsMenuIconHamburgerOff class="pa-3 w-[45px]" v-else />
    </div>

    <!-- =================== user ===================  -->

    <!-- configuration to show the modal-->
    <AppbarProfileCardChangeProfileCard />
    <!-- ============================================ -->

    <div class="flex-1"></div>

    <!-- ============ notifications icon ============ -->
    <v-menu
      origin="auto"
      location="bottom center"
      transition="slide-y-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ props }">
        <IconsIconNotifications
          v-bind="props"
          ref="notificationsButtonEl"
          class="cursor-pointer pa-2 w-[38px] h-[38px]"
        />
      </template>

      <!-- modal that will be shown if the icon is clicked -->
      <SpeechBubbles :notificationsButtonEl="notificationsButtonEl" />
    </v-menu>

    <!-- ============================================ -->

    <div class="mr-3"></div>

    <!-- SISGHA logo-->
    <LogoSisghaLogomarca
      class="cursor-pointer mr-8 w-[140px] hidden sm:block"
    />
  </div>
</template>