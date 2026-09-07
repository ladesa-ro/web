<script lang="ts" setup>
export type DashboardLayoutProps = {
  hamburguerActive?: boolean;
};

defineProps<DashboardLayoutProps>();

defineSlots<{
  header(): any;
  sidebar(): any;
  default(): any;
  footer(): any;
  toast(): any;
}>();
</script>

<template>
  <div class="ui-dashboard-layout">
    <div class="ui-dashboard-layout__header">
      <slot name="header" />
    </div>

    <div class="ui-dashboard-layout__sidebar">
      <slot name="sidebar" />
    </div>

    <section class="ui-dashboard-layout__content" :data-hamburger-active="hamburguerActive">
      <main class="ui-dashboard-layout__main">
        <slot />
      </main>

      <slot name="footer" />
    </section>

    <slot name="toast" />
  </div>
</template>
