<template>
  <button class="ui-button">
    <div class="start-icon" v-show="$slots['start-icon']">
      <slot name="start-icon" />
    </div>

    <div class="content">
      <slot />
    </div>
  </button>
</template>

<style scoped>
.ui-button {
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 100%;

  padding: 0.875rem 1.25rem;
  border-radius: 0.5625rem;

  @apply bg-ldsa-green-1 text-ldsa-bg dark:text-[#dfdfdf];

  font-size: 1rem;
  font-weight: 600;
}

.ui-button:disabled {
  @apply bg-ldsa-green-1/50;
  cursor: not-allowed;
}

.ui-button:focus {
  outline: none;
}

.ui-button:focus,
.ui-button:focus-within {
  @apply border-ldsa-green-2/50;
  @apply shadow-[0_0_0.5px_5px_rgba(var(--ladesa-green-1-color),0.4)]; /* box-shadow: 0px 0px 0.5px 5px #1b5b3f; */
}

.content {
  flex: 1;
  text-align: center;
}
</style>
