<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <UIButtonDefaultSquare>
        <IconsSettings class="gestao-popover__trigger-icon" />
      </UIButtonDefaultSquare>
    </template>

    <div
      class="gestao-popover__panel u-flex u-flex-col u-gap-5 u-rounded-lg u-p-4 u-mt-2"
    >
      <UITitle text="Gestão de..." variant="mini" />

      <div class="u-flex u-gap-4">
        <NuxtLink to="/sisgha/dape/calendario/gestao-calendarios" class="link">
          <IconsCalendar
            class="gestao-popover__icon gestao-popover__icon--md icon"
          />
          Calendários
        </NuxtLink>

        <NuxtLink to="/sisgha/dape/calendario/gestao-eventos" class="link">
          <IconsEvent
            class="gestao-popover__icon gestao-popover__icon--lg icon"
          />
          Eventos
        </NuxtLink>

        <NuxtLink to="/sisgha/dape/calendario/colecoes" class="link">
          <IconsCalendar
            class="gestao-popover__icon gestao-popover__icon--md icon"
          />
          Coleções
        </NuxtLink>
      </div>

      <UIButtonModalCancel
        variant="small"
        class="u-w-full"
        @click="open = false"
      />
    </div>
  </UIPopover>
</template>

<style scoped>
.gestao-popover__trigger-icon {
  width: 1.375rem;
  height: 1.25rem;
}

.gestao-popover__panel {
  border: 2px solid var(--ladesa-grey-color);
  background-color: var(--ladesa-background-color);
}

.gestao-popover__icon {
  color: var(--ladesa-text-default-color);
}

.gestao-popover__icon--md {
  width: 2rem;
  height: 2rem;
}

.gestao-popover__icon--lg {
  width: 2.5rem;
  height: 2.5rem;
}

.link {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  width: 6rem;
  height: 7rem;
  padding-block: 1.75rem;
  border: 2px solid rgb(from var(--ladesa-grey-color) R G B / 50%);
  border-radius: var(--ui-radius-lg);
  text-align: center;
  font-weight: var(--ui-font-weight-semibold);
  font-size: 0.875rem;
  transition: all 100ms;
}

@media (min-width: 640px) {
  .link {
    width: 7rem;
    height: 8.5rem;
    padding-block: 2rem;
  }
}

.link:hover {
  background-color: var(--ladesa-green-1-color);
  color: var(--ladesa-white-color);
  border-color: var(--ladesa-green-1-color);
  transform: scale(1.05);
}

.link:hover > .icon {
  color: var(--ladesa-white-color);
}
</style>
