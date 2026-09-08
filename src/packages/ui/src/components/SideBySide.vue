<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

export type SideBySideCollapseTarget = 'primary' | 'secondary';

export type SideBySideProps = {
  collapsed?: boolean;
  collapseTarget?: SideBySideCollapseTarget;
  primaryLabel?: string;
  secondaryLabel?: string;
  showSecondary?: boolean;
};

const props = withDefaults(defineProps<SideBySideProps>(), {
  showSecondary: true,
});

const TABS_BREAKPOINT = 1200;

const collapseTarget = computed(() => props.collapseTarget ?? 'secondary');

const secondaryEnabled = computed(() => props.showSecondary);

const isSinglePanel = computed(() => !secondaryEnabled.value || props.collapsed);

const showPrimary = computed(() => {
  if (!secondaryEnabled.value) return true;
  if (!props.collapsed) return true;
  return collapseTarget.value === 'primary';
});

const showSecondaryPanel = computed(() => {
  if (!secondaryEnabled.value) return false;
  if (!props.collapsed) return true;
  return collapseTarget.value === 'secondary';
});

const useTabs = ref(false);
const activeTab = ref<SideBySideCollapseTarget>('primary');

const checkFit = () => {
  useTabs.value = window.innerWidth < TABS_BREAKPOINT;
};

onMounted(() => {
  checkFit();
  window.addEventListener('resize', checkFit);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkFit);
});

const columns = computed(() => (isSinglePanel.value ? 1 : 2));

const isGrid = computed(() => !useTabs.value || isSinglePanel.value);

const isPrimaryVisible = computed(() => {
  if (isSinglePanel.value) return showPrimary.value;
  if (!useTabs.value) return true;
  return activeTab.value === 'primary';
});

const isSecondaryVisible = computed(() => {
  if (isSinglePanel.value) return showSecondaryPanel.value;
  if (!useTabs.value) return true;
  return activeTab.value === 'secondary';
});
</script>

<template>
  <div
    :class="[
      isGrid
        ? isSinglePanel
          ? 'ui-side-by-side--grid-single'
          : 'u-w-full'
        : 'ui-side-by-side--tabs',
      !isGrid && collapsed && 'ui-side-by-side--tabs-collapsed',
    ]"
  >
    <div v-show="!isGrid && !isSinglePanel" class="ui-side-by-side__tabs">
      <button
        type="button"
        class="ui-side-by-side__tab"
        :class="activeTab === 'primary' && 'ui-side-by-side__tab--active'"
        @click="activeTab = 'primary'"
      >
        {{ primaryLabel ?? 'Painel 1' }}
      </button>

      <button
        type="button"
        class="ui-side-by-side__tab"
        :class="activeTab === 'secondary' && 'ui-side-by-side__tab--active'"
        @click="activeTab = 'secondary'"
      >
        {{ secondaryLabel ?? 'Painel 2' }}
      </button>
    </div>

    <div
      :class="[
        isGrid
          ? 'ui-side-by-side__content--grid'
          : 'ui-side-by-side__content--tabs',
        isGrid &&
          (isSinglePanel
            ? 'ui-side-by-side__content--single'
            : 'ui-side-by-side__content--dual'),
      ]"
      :style="
        isGrid ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined
      "
    >
      <div
        v-show="isGrid ? isPrimaryVisible : true"
        :class="[
          isGrid
            ? 'ui-side-by-side__panel--grid'
            : 'ui-side-by-side__panel--tab',
          !isGrid &&
            (activeTab === 'primary'
              ? 'ui-side-by-side__panel--tab-active'
              : 'ui-side-by-side__panel--tab-hidden-left'),
        ]"
      >
        <slot name="primary" />
      </div>

      <div
        v-show="isGrid ? isSecondaryVisible : true"
        :class="[
          isGrid
            ? 'ui-side-by-side__panel--grid'
            : 'ui-side-by-side__panel--tab',
          !isGrid &&
            (activeTab === 'secondary'
              ? 'ui-side-by-side__panel--tab-active'
              : 'ui-side-by-side__panel--tab-hidden-right'),
        ]"
      >
        <slot name="secondary" />
      </div>
    </div>
  </div>
</template>
