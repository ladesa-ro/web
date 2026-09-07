<script lang="ts" setup>
type CollapseTarget = 'primary' | 'secondary';

const props = withDefaults(
  defineProps<{
    collapsed?: boolean;
    collapseTarget?: CollapseTarget;
    primaryLabel?: string;
    secondaryLabel?: string;
    showSecondary?: boolean;
  }>(),
  {
    showSecondary: true,
  }
);

const collapseTarget = computed(() => props.collapseTarget ?? 'secondary');

const secondaryEnabled = computed(() => props.showSecondary);

const isSinglePanel = computed(
  () => !secondaryEnabled.value || props.collapsed
);

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

// --- Auto-detect: do 2 panels fit side by side? ---

const useTabs = ref(false);
const activeTab = ref<'primary' | 'secondary'>('primary');

const THRESHOLD = 1200;

function checkFit() {
  useTabs.value = window.innerWidth < THRESHOLD;
}

onMounted(() => {
  checkFit();
  window.addEventListener('resize', checkFit);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkFit);
});

const columns = computed(() => {
  if (isSinglePanel.value) return 1;
  return 2;
});

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
          ? 'side-by-side__root--grid-single'
          : 'u-w-full'
        : 'side-by-side__root--tabs',
      !isGrid && collapsed && 'side-by-side__root--tabs-collapsed',
    ]"
  >
    <!-- Tabs header (only in tabs mode, not collapsed, secondary enabled) -->
    <div v-show="!isGrid && !isSinglePanel" class="side-by-side__tabs-header">
      <button
        type="button"
        class="side-by-side__tab-button"
        :class="activeTab === 'primary' && 'side-by-side__tab-button--active'"
        @click="activeTab = 'primary'"
      >
        {{ primaryLabel ?? 'Painel 1' }}
      </button>
      <button
        type="button"
        class="side-by-side__tab-button"
        :class="
          activeTab === 'secondary' && 'side-by-side__tab-button--active'
        "
        @click="activeTab = 'secondary'"
      >
        {{ secondaryLabel ?? 'Painel 2' }}
      </button>
    </div>

    <!--
      Single content container — switches between grid and tabs layout.
      Slots are rendered ONCE (v-show, never v-if) so state is preserved.
    -->
    <div
      :class="[
        isGrid ? 'side-by-side__content--grid' : 'side-by-side__content--tabs',
        isGrid &&
          (isSinglePanel
            ? 'side-by-side__content--single'
            : 'side-by-side__content--dual'),
      ]"
      :style="
        isGrid ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined
      "
    >
      <div
        v-show="isGrid ? isPrimaryVisible : true"
        :class="[
          isGrid ? 'side-by-side__panel--grid' : 'side-by-side__panel--tab',
          !isGrid &&
            (activeTab === 'primary'
              ? 'side-by-side__panel--tab-active'
              : 'side-by-side__panel--tab-hidden-left'),
        ]"
      >
        <slot name="primary" />
      </div>
      <div
        v-show="isGrid ? isSecondaryVisible : true"
        :class="[
          isGrid ? 'side-by-side__panel--grid' : 'side-by-side__panel--tab',
          !isGrid &&
            (activeTab === 'secondary'
              ? 'side-by-side__panel--tab-active'
              : 'side-by-side__panel--tab-hidden-right'),
        ]"
      >
        <slot name="secondary" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Root modes --- */

.side-by-side__root--grid-single {
  width: fit-content;
}

.side-by-side__root--tabs {
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  padding-inline: var(--ui-space-3);
  padding-block: 4rem;
  width: min(95vw, 35rem);
  height: 100dvh;
}

.side-by-side__root--tabs-collapsed {
  width: min(95vw, 40rem);
  padding-top: var(--ui-space-8);
  padding-bottom: var(--ui-space-8);
}

/* --- Grid content --- */

.side-by-side__content--grid {
  display: grid;
  gap: var(--ui-space-4);
  padding: var(--ui-space-2);
  align-items: stretch;
  margin-inline: auto;
}

.side-by-side__content--grid.side-by-side__content--dual {
  width: min(95vw, 70rem);
}

.side-by-side__content--grid.side-by-side__content--single {
  width: auto;
}

.side-by-side__panel--grid {
  min-width: 0;
  height: 100%;
}

.side-by-side__content--dual
  .side-by-side__panel--grid
  :deep(.modal-layout) {
  max-width: none;
  width: 100%;
  height: 100%;
}

/* --- Tabs content --- */

.side-by-side__content--tabs {
  width: 100%;
  flex: 1 1 0%;
  min-height: 0;
  position: relative;
}

.side-by-side__tabs-header {
  display: flex;
  gap: var(--ui-space-2);
  width: 100%;
  margin-bottom: var(--ui-space-3);
}

.side-by-side__tab-button {
  flex: 1 1 0%;
  padding-block: var(--ui-space-3);
  padding-inline: var(--ui-space-4);
  font-size: 0.875rem;
  font-weight: var(--ui-font-weight-medium);
  border-radius: var(--ui-radius-lg);
  border: 2px solid var(--ladesa-grey-color);
  background-color: var(--ladesa-background-color);
  color: var(--ladesa-text-default-color);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.side-by-side__tab-button:hover {
  background-color: var(--ladesa-grey-color);
}

.side-by-side__tab-button:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--ladesa-background-color),
    0 0 0 4px var(--ladesa-green-1-color);
}

.side-by-side__tab-button--active {
  background-color: var(--ladesa-green-1-color);
  border-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}

.side-by-side__tab-button--active:hover {
  background-color: var(--ladesa-green-1-color);
}

.side-by-side__panel--tab {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition:
    opacity 400ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.side-by-side__panel--tab-active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 1;
}

.side-by-side__panel--tab-hidden-left {
  opacity: 0;
  transform: translateX(-1.5rem) scale(0.97);
  z-index: 0;
  pointer-events: none;
}

.side-by-side__panel--tab-hidden-right {
  opacity: 0;
  transform: translateX(1.5rem) scale(0.97);
  z-index: 0;
  pointer-events: none;
}

.side-by-side__panel--tab :deep(.modal-layout) {
  max-width: none;
  width: 100%;
  height: 100%;
  max-height: none;
  min-height: 0;
}

.side-by-side__panel--tab :deep(.modal-layout .content) {
  max-height: none;
  flex: 1 1 0%;
  min-height: 0;
}
</style>
