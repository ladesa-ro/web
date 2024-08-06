<script setup lang="ts">
// import profilePicture from '~/assets/icons/profilePicture.svg';

import { ref } from 'vue';
import { ApiImageResource, useApiImageRoute } from '../../integrations';
import { useApiContext } from '../API/Context/setup-context';
import SpeechBubbles from './SpeechBubbles/SpeechBubbles.vue';

const { resumoVinculos, usuario, whoAmI } = useApiContext();

const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});

function toggleHamburger() {
  hamburgerActive.value = !hamburgerActive.value;
}

const notificationsButtonEl = ref(null);

const profilePicureUrl = useApiImageRoute(
  ApiImageResource.USUARIO_PROFILE,
  usuario
);
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
    <v-menu
      origin="auto"
      location="bottom center"
      transition="slide-y-transition"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ props, isActive }">
        <div
          v-bind="props"
          class="flex items-center gap-3 cursor-pointer rounded-lg inset-y-0 w-29 bg-[#EBF8EF] pl-3 pr-6 py-2"
        >
          <VImg
            :width="48"
            :height="48"
            :src="profilePicureUrl ?? ''"
            class="rounded-full bg-green-700"
          />

          <div>
            <p class="font-semibold">{{ whoAmI.usuario.nome }}</p>

            <p class="font-normal flex flex-row items-center gap-2">
              <span>
                {{ resumoVinculos.cargos.join(', ') }}
              </span>

              <!-- configuration to show the modal-->
              <IconsArrowIconArrow
                ref="notificationsButtonEl"
                class="arrow -rotate-90 cursor-pointer -icon-green"
                :class="{ down: isActive }"
              />
            </p>
          </div>
        </div>
      </template>

      <!-- modal that will be shown if the arrow icon is clicked -->
      <SectionUsuariosModalsAccessRole />
    </v-menu>
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

<style scoped>
.arrow {
  -moz-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
}

.arrow.down {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
