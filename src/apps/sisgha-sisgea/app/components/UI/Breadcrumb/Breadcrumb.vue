<script lang="ts" setup>
import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const props = defineProps<{
  items: ISidebarItem[];
  goBackTo?: string;
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
          bestMatch = {
            segments: [{ title: item.pageTitle ?? item.title, to: item.to }],
            length: matchLen,
          };
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
                { title: item.pageTitle ?? item.title },
                { title: child.pageTitle ?? child.title, to: child.to },
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
  <div v-if="breadcrumb.length > 0" class="flex flex-wrap items-center gap-4">
    <NuxtLink
      v-if="goBackTo"
      :to="goBackTo"
      class="go-back"
    >
      <IconsArrowAlt class="w-5.5 text-ldsa-grey" />
    </NuxtLink>
    <UITitle class="flex-1">
      <nav class="flex items-center">
        <template v-for="(entry, index) in breadcrumb" :key="index">
          <span v-if="index > 0" class="separator">/</span>
          <NuxtLink
            v-if="entry.to && index < breadcrumb.length - 1"
            :to="entry.to"
            class="entry parent"
          >
            {{ entry.title }}
          </NuxtLink>
          <span
            v-else
            class="entry"
            :class="{ parent: index < breadcrumb.length - 1 }"
          >
            {{ entry.title }}
          </span>
        </template>
      </nav>
    </UITitle>
    <slot />
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.separator {
  @apply mx-2 text-ldsa-grey font-normal;
}

.entry {
  @apply text-ldsa-text-default no-underline;
}

.entry.parent {
  @apply text-ldsa-text-default/40;
}

.go-back {
  @apply hover:shadow-[0_0_0_5px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_0_0_5px_rgb(255,255,255,0.04)]
    hover:bg-ldsa-grey/15 flex shrink-0 items-center p-1 rounded-full mr-3;
}
</style>
