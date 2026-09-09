<script lang="ts" setup>
const hamburgerActive = defineModel<boolean>({
  required: true,
});
</script>

<template>
  <header class="u-flex u-items-center u-w-full appbar">
    <button
      class="u-shrink-0 appbar__hamburger-button"
      @pointerdown="hamburgerActive = !hamburgerActive"
    >
      <IconsMenuHamburgerOn
        v-if="hamburgerActive"
        class="u-p-3 appbar__hamburger-icon"
      />
      <IconsMenuHamburgerOff
        v-else
        class="u-p-3 u-h-full appbar__hamburger-icon"
      />
    </button>

    <AppbarProfileCardChangeProfileCard />

    <div class="u-flex-1" />

    <AppbarChangeCampus />

    <UIButtonNotification class="u-shrink-0 u-mr-3" />

    <AppbarChangeTheme class="u-shrink-0 appbar__theme-toggle" />

    <AppbarChangeSystem />
  </header>
</template>

<style scoped>
.appbar {
  padding-right: 0.75rem;
  height: 3.5rem;
  border-bottom: 1px solid rgb(from var(--ladesa-grey-color) R G B / 50%);
  background-color: var(--ladesa-background-color);
}

@media (max-width: 345px) {
  .appbar {
    padding-right: 0.375rem;
  }
}

@media (min-width: 740px) {
  .appbar {
    padding-right: 1.625rem;
  }
}

@media (min-width: 640px) {
  .appbar {
    height: 4.563rem;
  }
}

.appbar__hamburger-button {
  margin: 0.34375rem;
}

.appbar__hamburger-icon {
  width: 2.813rem;
}

.appbar__theme-toggle {
  margin-right: 0;
}

@media (min-width: 740px) {
  .appbar__theme-toggle {
    margin-right: 0.75rem;
  }
}
</style>
