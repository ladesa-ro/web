<script lang="ts" setup>
const open = defineModel<boolean>({ required: true });

defineEmits<{ 'add-occurrence': [] }>();
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <button
        type="button"
        class="u-flex u-p-2 u-justify-center u-items-center u-rounded-lg event-card__icon-button"
        title="Mais opções"
      >
        <IconsMoreItems class="event-card__icon" />
      </button>
    </template>

    <div class="u-flex u-flex-col u-gap-1 u-rounded-lg u-p-2 event-card__menu">
      <button
        type="button"
        class="u-flex u-items-center u-gap-2 u-px-3 u-py-2 u-rounded-md u-text-sm u-text-left event-card__menu-item"
        @click="$emit('add-occurrence')"
      >
        <IconsAdd class="event-card__menu-icon" />
        Adicionar data avulsa
      </button>
    </div>
  </UIPopover>
</template>

<style scoped>
.event-card__icon-button {
  color: var(--ladesa-text-default-color);
  transition: background-color var(--ui-duration-fast) var(--ui-easing-standard);
}

.event-card__icon-button:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 30%);
}

.event-card__icon {
  color: var(--ladesa-text-default-color);
  width: 1.25rem;
  height: 1.25rem;
}

.event-card__menu {
  border: 2px solid var(--ladesa-grey-color);
  background-color: var(--ladesa-background-color);
  margin-top: var(--ui-space-2);
  min-width: 12rem;
}

.event-card__menu-item {
  color: var(--ladesa-text-default-color);
}

.event-card__menu-item:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 20%);
}

.event-card__menu-icon {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
