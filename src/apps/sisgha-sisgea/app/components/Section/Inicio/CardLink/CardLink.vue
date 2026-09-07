<script lang="ts" setup>
const { to } = defineProps<{
  to?: string;
  icon: any;
  title: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="u-rounded-md u-p-6 u-flex u-flex-col u-items-center card-link"
  >
    <component :is="icon" class="u-mb-4 card-link__icon" />

    <span class="u-font-bold card-link__label">
      {{ title }}
    </span>
  </NuxtLink>
</template>

<style scoped>
.card-link {
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 5%);
  border: 1px solid rgb(from var(--ladesa-green-1-color) R G B / 50%);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    scale var(--ui-duration-base) var(--ui-easing-standard),
    box-shadow var(--ui-duration-base) var(--ui-easing-standard),
    filter var(--ui-duration-base) var(--ui-easing-standard);
}

.card-link:hover {
  filter: brightness(1.1);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 5%),
    0 4px 6px -4px rgb(0 0 0 / 5%);
  scale: 1.02;
}

.card-link__icon {
  width: 4rem;
  height: 4rem;
  color: var(--ladesa-text-green-color);
}

.card-link__label {
  color: var(--ladesa-text-green-color);
  font-size: 0.938rem;
}
</style>
