<script lang="ts" setup>
type Props = {
  label: string;
  imageUrl: string | null;
  cargo: string;
  selected: boolean;
};

defineProps<Props>();

defineEmits<{ toggle: [] }>();
</script>

<template>
  <div
    class="u-flex u-items-center u-gap-3 u-rounded-lg professores-tab__item"
    :class="{ 'professores-tab__item--selected': selected }"
    @click.stop="$emit('toggle')"
  >
    <div
      class="u-flex u-items-center u-justify-center u-shrink-0 u-overflow-hidden u-rounded-md professores-tab__avatar"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="u-w-full u-h-full professores-tab__avatar-image"
      />
      <IconsUser v-else class="professores-tab__avatar-icon" />
    </div>

    <div class="u-flex u-flex-col u-flex-1 professores-tab__info">
      <p class="u-font-semibold u-text-sm professores-tab__name">
        {{ label }}
      </p>
      <p v-if="cargo" class="u-text-xs professores-tab__cargo">{{ cargo }}</p>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.professores-tab__item {
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 100%);
  padding-right: var(--ui-space-3);
  margin-bottom: var(--ui-space-1);
  cursor: pointer;
  transition:
    background-color var(--ui-duration-base) var(--ui-easing-standard),
    border-color var(--ui-duration-base) var(--ui-easing-standard);
}

.professores-tab__item--selected {
  border-color: var(--ladesa-green-1-color);
  background-color: rgb(from var(--ladesa-green-1-color) R G B / 10%);
}

.professores-tab__avatar {
  width: 3rem;
  height: 3rem;
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.professores-tab__avatar-image {
  object-fit: cover;
}

.professores-tab__avatar-icon {
  width: var(--ui-space-6);
  height: var(--ui-space-6);
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}

.professores-tab__info {
  padding-block: var(--ui-space-2);
}

.professores-tab__name {
  color: var(--ladesa-text-default-color);
}

.professores-tab__cargo {
  color: rgb(from var(--ladesa-grey-color) R G B / 100%);
}
</style>
