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
    <div class="m-[0.34375rem]" @click="toggleHamburger"> <!--m-[5.5px]-->
      <IconsMenuIconHamburgerOn class="pa-3 w-[45px]" v-if="hamburgerActive" />
      <IconsMenuIconHamburgerOff class="pa-3 w-[45px]" v-else />
    </div>

    <!-- =================== user ===================  -->
    <div
      class="flex items-center gap-3 cursor-pointer rounded-lg inset-y-0 w-29 bg-[#EBF8EF] pl-3 pr-6 py-2"
    >
      <VImg :width="48" :height="48" class="rounded-full bg-green-700" />

      <div>
        <p class="font-semibold">Danilo Escudero</p>
        <p class="font-normal flex flex-row items-center gap-2">
          DAPE

		  <!-- configuration to show the modal-->
          <v-menu
            origin="auto"
            location="bottom center"
            transition="slide-y-transition"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ props, isActive }">
              <IconsArrowIconArrow
                v-bind="props"
                ref="notificationsButtonEl"
                class="-rotate-90 cursor-pointer -icon-green"
                :class="{ down: isActive }"
              />
            </template>

			<!-- modal that will be shown if the arrow icon is clicked -->
            <SectionUsuariosChangeJobTitle
              :notificationsButtonEl="notificationsButtonEl"
            />
          </v-menu>
        </p>
      </div>
    </div>
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