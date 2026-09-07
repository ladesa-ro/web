<script lang="ts" setup>
type Props = {
  positionName: string;
  to: string;
  active: boolean;
};

const { to } = defineProps<Props>();
</script>

<template>
  <nuxt-link
    :class="{ active }"
    :to="to"
    class="access-role-button u-flex u-flex-col u-justify-end u-items-center u-gap-2 u-rounded-lg u-text-center u-font-semibold u-py-7"
  >
    <!-- icon -->
    <slot />

    {{ positionName }}
  </nuxt-link>
</template>

<style scoped>
.access-role-button {
  width: 6rem;
  height: 7rem;
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 50%);
}

@media (max-width: 639.98px) {
  .access-role-button {
    font-size: 0.875rem;
  }
}

@media (min-width: 640px) {
  .access-role-button {
    width: 7rem;
    height: 9rem;
    padding-block: var(--ui-space-8);
  }
}

.active {
  background-color: var(--ladesa-green-1-color);
  border-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
}
</style>
