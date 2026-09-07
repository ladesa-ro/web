<script lang="ts" setup>
import { Breadcrumb, type BreadcrumbEntry } from '@ladesa-ro/web.ui';
import { resolveComponent } from 'vue';
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

const NuxtLink = resolveComponent('NuxtLink');

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
      if (path === item.to || (!item.exact && path.startsWith(item.to + '/'))) {
        const matchLen = item.to.length;
        if (!bestMatch || matchLen > bestMatch.length) {
          bestMatch = {
            segments: [{ title: item.pageTitle ?? item.title, to: item.to }],
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

const segments = computed(() => {
  const value = breadcrumbResult.value.segments;
  if (props.extraSegment) {
    return [...value, { title: props.extraSegment }];
  }
  return value;
});
const isHome = computed(() => breadcrumbResult.value.isHome);
const shouldShowGoBack = computed(
  () => props.showGoBack && !isHome.value && segments.value.length > 0
);
</script>

<template>
  <Breadcrumb
    :segments="segments"
    :show-go-back="shouldShowGoBack"
    :as="NuxtLink"
    @go-back="() => goBack()"
  >
    <slot />
  </Breadcrumb>
</template>
