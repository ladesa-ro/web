<script lang="ts" setup>
import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const props = withDefaults(
  defineProps<{
    items: ISidebarItem[];
    showGoBack?: boolean;
    extraSegment?: string | null;
  }>(),
  { showGoBack: true, extraSegment: null }
);

const route = useRoute();
const { goBack } = useSafeBack();

type BreadcrumbEntry = { title: string; to?: string };

const breadcrumbResult = computed<{
  segments: BreadcrumbEntry[];
  isHome: boolean;
}>(() => {
  const path = route.path;

  let bestMatch: {
    segments: BreadcrumbEntry[];
    length: number;
    isHome: boolean;
  } | null = null;

  for (const item of props.items) {
    if (item.type === 'link') {
      if (
        path === item.to ||
        (!item.exact && path.startsWith(item.to + '/'))
      ) {
        const matchLen = item.to.length;
        if (!bestMatch || matchLen > bestMatch.length) {
          bestMatch = {
            segments: [
              { title: item.pageTitle ?? item.title, to: item.to },
            ],
            length: matchLen,
            isHome: !!item.exact && path === item.to,
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
              isHome: false,
            };
          }
        }
      }
    }
  }

  return bestMatch ?? { segments: [], isHome: false };
});

const breadcrumb = computed(() => {
  const segments = breadcrumbResult.value.segments;
  if (props.extraSegment) {
    return [...segments, { title: props.extraSegment }];
  }
  return segments;
});
const isHome = computed(() => breadcrumbResult.value.isHome);
const shouldShowGoBack = computed(
  () => props.showGoBack && !isHome.value && breadcrumb.value.length > 0
);
</script>

<template>
  <div v-if="breadcrumb.length > 0" class="flex flex-wrap items-center gap-4">
    <button
      v-if="shouldShowGoBack"
      type="button"
      class="go-back"
      @click="goBack()"
    >
      <IconsArrowAlt class="w-5.5 text-ldsa-grey" />
    </button>
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
    hover:bg-ldsa-grey/15 flex shrink-0 items-center p-1 rounded-full cursor-pointer;
}
</style>
