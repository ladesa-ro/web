<template>
  <button class="ui-button">
    <span v-if="$slots['start-icon']" class="start-icon">
      <slot name="start-icon" />
    </span>

    <p class="text">
      <slot />
    </p>
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.ui-button {
  @apply flex items-center w-full px-5 py-[0.875rem] cursor-pointer;
  @apply rounded-[0.5625rem] bg-ldsa-green-1 font-semibold text-ldsa-white;
  @apply disabled:bg-ldsa-green-1/50 disabled:cursor-not-allowed;
  @apply focus:outline-hidden;
}

.ui-button:focus,
.ui-button:focus-within {
  @apply border-ldsa-green-2/50;
  box-shadow: 0 0 0.5px 5px rgb(from var(--ladesa-green-1-color) R G B / 30%);
}

.text {
  @apply flex-1 text-center;
}
</style>
