<script lang="ts" setup>
import { ref } from 'vue';

setupApiClient();

const { isDark } = useCustomTheme();

const dayjs = useDayJs();

const selectedDay = ref(dayjs());
provide('selectedDay', selectedDay);
</script>

<template>
  <Head>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <Link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </Head>

  <div
    class="app"
    :class="isDark ? 'app-color-mode-dark' : 'app-color-mode-light'"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import '~/assets/styles/themes/theme.css';
@import '~/assets/styles/fontePadrao.css';

body {
  font-family: 'Poppins', sans-serif;
}

img {
  display: block;
  max-width: 100%;
}

svg {
  max-width: 100%;
  height: auto;
  display: block;
}

.svg-fill-text path {
  fill: rgb(var(--sisgha-theme-text));
}

html {
  overflow: auto;
}

.v-btn {
  grid-template-rows: 1fr;
}
</style>
