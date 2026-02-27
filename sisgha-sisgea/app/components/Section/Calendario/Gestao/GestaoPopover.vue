<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <UIButtonDefaultSquare>
        <IconsSettings class="w-5.5 h-5" />
      </UIButtonDefaultSquare>
    </template>

    <div
      class="flex flex-col border-2 gap-5 border-ldsa-grey rounded-lg p-4 bg-ldsa-bg mt-2"
    >
      <UITitle text="Gestão de..." variant="mini" />

      <div class="flex gap-4">
        <NuxtLink to="gestao-calendarios" class="link">
          <IconsCalendar class="w-8 h-8 text-ldsa-text-default icon" />
          Calendários
        </NuxtLink>

        <NuxtLink to="gestao-eventos" class="link">
          <IconsEvent class="w-10 h-10 text-ldsa-text-default icon" />
          Eventos
        </NuxtLink>
      </div>

      <UIButtonModalCancel
        variant="small"
        class="w-full"
        @click="open = false"
      />
    </div>
  </UIPopover>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.link {
  @apply flex flex-col justify-end items-center gap-2 w-24 h-28 sm:w-28 sm:h-34 py-7 sm:py-8 border-2 rounded-lg border-ldsa-grey/50 text-center font-semibold text-sm hover:bg-ldsa-green-1 hover:text-ldsa-white hover:border-ldsa-green-1 hover:scale-105 transition-all duration-100;
}

.link:hover > .icon {
  @apply text-ldsa-white;
}
</style>
