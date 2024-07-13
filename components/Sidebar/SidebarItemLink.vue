<script setup lang="ts">
import type { ISidebarItem } from './ISidebarItem';

type Props = { item: ISidebarItem };

const props = defineProps<Props>();

const { item } = toRefs(props);
</script>

<template>
  <v-list-item
    v-if="item.type === 'link'"
    :to="item.to"
    :key="item.title"
    :exact="item.exact ?? false"
    :ripple="false"
    class="text-white !mt-0 hover:bg-green-600"
  >
    <template v-slot:prepend>
      <img
        :width="24"
        class="mr-4 -icon-white"
        :src="item.icon"
        alt="Ícone da funcionalidade."
      />
    </template>

    <v-list-item-title class="link">
      <span>{{ item.title }}</span>
    </v-list-item-title>
  </v-list-item>
</template>
