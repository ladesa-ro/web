<script setup lang="ts">
import { useNow } from '@vueuse/core';

const now = useNow();

const yearOfToday = computed(() => now.value.getFullYear());

const copyrightOwners = computed(() => {
  return [
    {
      id: 1,
      yearStart: 2022,
      yearEnd: yearOfToday.value,
      owner: 'Ladesa',
    },
  ];
});

const footerLinks = [
  {
    icon: 'mdi-heart-pulse',
    href: '#',
    label: 'Status',
  },

  {
    icon: 'mdi-github',
    href: 'https://github.com/ladesa-ro',
    label: 'GitHub',
  },

  {
    icon: 'mdi-book',
    href: 'https://docs.ladesa.com.br/user-guides/',
    label: 'Documentação',
  },
];
</script>

<template>
  <footer class="footer-root">
    <v-container class="footer-container">
      <div class="footer-body">
        <div>
          <p v-for="copyrightOwner of copyrightOwners" :key="copyrightOwner.id">
            <span>© </span>

            <span>{{ ' ' }}</span>

            <span v-if="copyrightOwner.yearStart !== copyrightOwner.yearEnd">
              {{ copyrightOwner.yearStart }} – {{ copyrightOwner.yearEnd }}
            </span>

            <span>{{ ' ' }}</span>

            <span>
              <strong>
                {{ copyrightOwner.owner }}
              </strong>
            </span>

            <span>.</span>
          </p>
        </div>

        <div class="flex-1"></div>

        <div class="flex flex-wrap items-center justify-center">
          <v-btn
            v-for="link in footerLinks.filter((i) => i.href !== '#')"
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
      </div>
    </v-container>
  </footer>
</template>

<style scoped>
.footer-root {
  @apply w-full flex-grow-0 flex-shrink-0;
  @apply flex flex-col justify-stretch;

  @apply bg-gray-100/50;
  @apply border-t-[1px] border-solid;
}

.footer-body {
  @apply w-full;

  @apply justify-center md:justify-start flex flex-wrap items-center flex-col-reverse gap-2 lg:flex-row;

  @apply max-w-[89%] mx-auto px-7 py-3;
}

.footer-container {
  @apply p-0;
}
</style>
