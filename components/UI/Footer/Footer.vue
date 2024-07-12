<script setup lang="ts">
const footerLinks = [
  {
    icon: 'mdi-github',
    href: 'https://github.com/ladesa-ro',
    label: 'GitHub',
  },

  {
    icon: 'mdi-book',
    href: 'https://docs.ladesa.com.br',
    label: 'Documentação',
  },
];
</script>

<template>
  <footer class="footer-root">
    <div class="footer-body">
      <div>
        <div>{{ new Date().getFullYear() }} — <strong>Ladesa</strong></div>
      </div>

      <div class="flex-1"></div>

      <v-btn
        v-for="link in footerLinks"
        :key="link.href"
        variant="text"
        target="_blank"
        :href="link.href"
        :prepend-icon="link.icon"
        append-icon="mdi-open-in-new"
      >
        {{ link.label }}
      </v-btn>
    </div>
  </footer>
</template>

<style scoped>
.footer-root {
  @apply w-full flex-grow-0;
  @apply flex flex-col justify-stretch;

  @apply bg-gray-100/50;
  @apply border-t-[1px] border-solid;
}

.footer-body {
  @apply w-full;

  @apply justify-center md:justify-start flex  items-center flex-col-reverse gap-2 sm:flex-row;

  @apply mx-auto px-4 md:!px-0 py-3;

  @apply max-w-screen-sm md:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-2xl;
}
</style>
