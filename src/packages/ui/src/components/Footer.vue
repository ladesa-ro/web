<script lang="ts" setup>
import { useNow } from '@vueuse/core';
import { computed } from 'vue';
import IconFooterBook from '../icons/Footer/Book.vue';
import IconFooterGitHub from '../icons/Footer/GitHub.vue';
import FooterButton from './FooterButton.vue';

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
    icon: IconFooterGitHub,
    href: 'https://github.com/ladesa-ro/web',
  },

  {
    label: 'Documentação',
    icon: IconFooterBook,
    href: 'https://docs.ladesa.com.br/user-guides/',
  },
];
</script>

<template>
  <footer class="ui-footer">
    <div class="ui-footer__inner">
      <p
        v-for="copyrightOwner of copyrightOwners"
        :key="copyrightOwner.id"
        class="ui-footer__copyright"
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

      <div class="ui-footer__spacer" />

      <div class="ui-footer__links">
        <FooterButton
          v-for="link in footerLinks.filter(i => i.href !== '#')"
          :key="link.href"
          :link="link"
        />
      </div>
    </div>
  </footer>
</template>
