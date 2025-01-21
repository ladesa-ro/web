<template>
  <button class="ui-button">
    <span v-show="$slots['start-icon']" class="start-icon">
      <slot name="start-icon" />
    </span>

    <p class="text">
      <slot />
    </p>
  </button>
</template>

<style scoped>
.ui-button {
  @apply flex items-center w-full px-5 py-[0.875rem];
  @apply rounded-[0.5625rem] bg-ldsa-green-1 font-semibold text-ldsa-white;
  @apply disabled:bg-ldsa-green-1/50 disabled:cursor-not-allowed;
  @apply focus:outline-none;
}

.ui-button:focus,
.ui-button:focus-within {
  @apply border-ldsa-green-2/50;
  @apply shadow-[0_0_0.5px_5px_rgba(var(--ladesa-green-1-color),0.3)];
}

.text {
  @apply flex-1 text-center;
}
</style>
