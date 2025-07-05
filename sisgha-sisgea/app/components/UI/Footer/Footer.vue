<script lang="ts" setup>
import { useNow } from '@vueuse/core';
import Discipline from '~/components/Icons/Footer/Book.vue';
import GitHub from '~/components/Icons/Footer/GitHub.vue';

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
    label: 'GitHub',
    icon: GitHub,
    href: 'https://github.com/ladesa-ro/web',
  },

  {
    label: 'Documentação',
    icon: Discipline,
    href: 'https://docs.ladesa.com.br/user-guides/',
  },
];
</script>

<template>
  <footer
    class="flex-1 flex flex-col justify-stretch lg:max-h-[3.75rem] border-solid border-t border-t-ldsa-grey/20 bg-ldsa-grey/10"
  >
    <div
      class="flex flex-col-reverse lg:flex-row flex-wrap justify-center md:justify-start items-center gap-2 min-xl:px-24 max-lg:px-16 py-3 w-full max-w-[89%] mx-auto"
    >
      <p
        class="block"
        v-for="copyrightOwner of copyrightOwners"
        :key="copyrightOwner.id"
      >
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

      <div class="flex-1" />

      <div class="flex flex-wrap items-center justify-center">
        <UIFooterButton
          v-for="link in footerLinks.filter(i => i.href !== '#')"
          :link="link"
        />
      </div>
    </div>
  </footer>
</template>
