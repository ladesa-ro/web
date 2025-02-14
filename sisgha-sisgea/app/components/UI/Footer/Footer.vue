<script lang="ts" setup>
import { useNow } from '@vueuse/core';
import IconGitHub from '~/components/Icons/IconGitHub.vue';
import IconDiscipline from '~/components/Icons/IconDiscipline.vue';

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
    icon: IconGitHub,
    href: 'https://github.com/ladesa-ro/web',
  },

  {
    label: 'Documentação',
    icon: IconDiscipline,
    href: 'https://docs.ladesa.com.br/user-guides/',
  },
];
</script>

<template>
  <footer
    class="flex-1 flex flex-col justify-stretch border-solid border-t border-t-ldsa-grey/20 bg-ldsa-grey/10"
  >
    <div
      class="w-full justify-center md:justify-start flex flex-wrap items-center flex-col-reverse gap-2 lg:flex-row max-w-[89%] mx-auto px-7 py-3"
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
          v-for="link in footerLinks.filter((i) => i.href !== '#')"
          :link="link"
        />
      </div>
    </div>
  </footer>
</template>
