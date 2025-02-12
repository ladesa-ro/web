<script lang="ts" setup>
const { isDark } = useCustomTheme();

setupApiClient();

const dayjs = useDayJs();
const selectedDay = ref(dayjs());
provide('selectedDay', selectedDay);

const colorModeClass = computed(() => {
  return isDark.value ? 'app-color-mode-dark' : 'app-color-mode-light';
});

useHead({
  bodyAttrs: {
    class: colorModeClass,
  },
});
</script>

<template>
  <Head>
    <Link href="https://fonts.googleapis.com" rel="preconnect" />
    <Link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <Link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
  </Head>

  <div class="app">
    <APIContext>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </APIContext>
  </div>
</template>
