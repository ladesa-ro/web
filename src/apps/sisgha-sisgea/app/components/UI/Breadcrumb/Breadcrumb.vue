<script lang="ts" setup>
import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const props = defineProps<{
  items: ISidebarItem[];
}>();

const route = useRoute();

type BreadcrumbEntry = { title: string; to?: string };

const breadcrumb = computed<BreadcrumbEntry[]>(() => {
  const path = route.path;

  let bestMatch: { segments: BreadcrumbEntry[]; length: number } | null = null;

  for (const item of props.items) {
    if (item.type === 'link') {
      if (path === item.to || (!item.exact && path.startsWith(item.to + '/'))) {
        const matchLen = item.to.length;
        if (!bestMatch || matchLen > bestMatch.length) {
          bestMatch = { segments: [{ title: item.title, to: item.to }], length: matchLen };
        }
      }
    }

    if (item.type === 'group') {
      for (const child of item.items) {
        if (child.type !== 'link') continue;
        if (path === child.to || path.startsWith(child.to + '/')) {
          const matchLen = child.to.length;
          if (!bestMatch || matchLen > bestMatch.length) {
            bestMatch = {
              segments: [
                { title: item.title },
                { title: child.title, to: child.to },
              ],
              length: matchLen,
            };
          }
        }
      }
    }
  }

  return bestMatch?.segments ?? [];
});
</script>

<template>
  <nav v-if="breadcrumb.length > 0" class="breadcrumb">
    <template v-for="(entry, index) in breadcrumb" :key="index">
      <span v-if="index > 0" class="separator">/</span>
      <NuxtLink
        v-if="entry.to && index === breadcrumb.length - 1"
        :to="entry.to"
        class="entry"
      >
        {{ entry.title }}
      </NuxtLink>
      <NuxtLink
        v-else-if="entry.to"
        :to="entry.to"
        class="entry parent"
      >
        {{ entry.title }}
      </NuxtLink>
      <span v-else class="entry parent">{{ entry.title }}</span>
    </template>
  </nav>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.breadcrumb {
  @apply flex items-center font-semibold text-lg sm:text-xl
    before:w-1.5 before:bg-ldsa-text-green before:mr-3 before:self-stretch;
}

.separator {
  @apply mx-2 text-ldsa-grey font-normal;
}

.entry {
  @apply text-ldsa-text-default no-underline;
}

.entry.parent {
  @apply text-ldsa-text-default/40;
}
</style>
