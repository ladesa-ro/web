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
      isGrid ? (isSinglePanel ? 'root-grid-single' : 'root-grid') : 'root-tabs',
      !isGrid && collapsed && 'root-tabs-collapsed',
    ]"
  >
    <!-- Tabs header (only in tabs mode, not collapsed, secondary enabled) -->
    <div v-show="!isGrid && !isSinglePanel" class="tabs-header">
      <button
        type="button"
        class="tab-button"
        :class="activeTab === 'primary' && 'tab-button-active'"
        @click="activeTab = 'primary'"
      >
        {{ primaryLabel ?? 'Painel 1' }}
      </button>
      <button
        type="button"
        class="tab-button"
        :class="activeTab === 'secondary' && 'tab-button-active'"
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
        isGrid ? 'content-grid' : 'content-tabs',
        isGrid && (isSinglePanel ? 'single-panel' : 'side-by-side'),
      ]"
      :style="
        isGrid ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined
      "
    >
      <div
        v-show="isGrid ? isPrimaryVisible : true"
        :class="[
          isGrid ? 'grid-panel' : 'tab-panel',
          !isGrid &&
            (activeTab === 'primary'
              ? 'tab-panel-active'
              : 'tab-panel-hidden-left'),
        ]"
      >
        <slot name="primary" />
      </div>
      <div
        v-show="isGrid ? isSecondaryVisible : true"
        :class="[
          isGrid ? 'grid-panel' : 'tab-panel',
          !isGrid &&
            (activeTab === 'secondary'
              ? 'tab-panel-active'
              : 'tab-panel-hidden-right'),
        ]"
      >
        <slot name="secondary" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

/* --- Root modes --- */

.root-grid {
  @apply w-full;
}

.root-grid-single {
  @apply w-fit;
}

.root-tabs {
  @apply flex flex-col px-3 py-16 mx-auto;
  width: min(95vw, 35rem);
  height: 100dvh;
}

.root-tabs-collapsed {
  width: min(95vw, 40rem);
  padding-top: 2rem;
  padding-bottom: 2rem;
}

/* --- Grid content --- */

.content-grid {
  @apply gap-4 p-2 items-stretch mx-auto;
  display: grid;
}

.content-grid.side-by-side {
  @apply w-[min(95vw,70rem)];
}

.content-grid.single-panel {
  @apply w-auto;
}

.grid-panel {
  @apply min-w-0 h-full;
}

.side-by-side .grid-panel :deep(.modal-layout) {
  @apply sm:max-w-none max-w-none w-full h-full;
}

/* --- Tabs content --- */

.content-tabs {
  @apply w-full flex-1 min-h-0 relative;
}

.tabs-header {
  @apply flex gap-2 w-full mb-3;
}

.tab-button {
  @apply flex-1 py-3 px-4 text-sm font-medium rounded-lg
         border-2 border-ldsa-grey bg-ldsa-bg text-ldsa-text-default
         transition-colors duration-200 cursor-pointer
         hover:bg-ldsa-grey
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ldsa-green-1 focus-visible:ring-offset-2;
}

.tab-button-active {
  @apply bg-ldsa-green-1 border-ldsa-green-1 text-white
         hover:bg-ldsa-green-1;
}

.tab-panel {
  @apply absolute inset-0 flex flex-col items-stretch;
  transition:
    opacity 400ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.tab-panel-active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 1;
}

.tab-panel-hidden-left {
  opacity: 0;
  transform: translateX(-1.5rem) scale(0.97);
  z-index: 0;
  pointer-events: none;
}

.tab-panel-hidden-right {
  opacity: 0;
  transform: translateX(1.5rem) scale(0.97);
  z-index: 0;
  pointer-events: none;
}

.tab-panel :deep(.modal-layout) {
  @apply sm:max-w-none max-w-none w-full h-full max-h-none min-h-0;
}

.tab-panel :deep(.modal-layout .content) {
  @apply max-h-none flex-1 min-h-0;
}
</style>
