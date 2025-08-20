<script lang="ts" setup>
const hamburgerActive = defineModel<boolean>({
  required: true,
});
</script>

<template>
  <header
    class="flex items-center w-full max-[345px]:pr-1.5 pr-3 sm:pr-7 h-14 sm:h-[4.563rem] border-b border-ldsa-grey/50 bg-ldsa-bg"
  >
    <button
      class="m-[0.34375rem] shrink-0"
      @pointerdown="hamburgerActive = !hamburgerActive"
    >
      <IconsMenuHamburgerOn v-if="hamburgerActive" class="p-3 w-[2.813rem]" />
      <IconsMenuHamburgerOff v-else class="p-3 w-[2.813rem] h-full" />
    </button>

    <AppbarProfileCardChangeProfileCard />

    <div class="flex-1" />

    <AppbarCampus />

    <AppbarChangeTheme class="shrink-0 sm:mr-3" />

    <UIPopover class="hidden sm:inline">
      <template #activator>
        <LogoSISGHALogomarca
          v-if="$route.path.includes('sisgha')"
          class="mb-0! w-[8.75rem] cursor-pointer shrink-0"
        />
        <LogoSISGEALogomarca
          v-else-if="$route.path.includes('sisgea')"
          class="w-[8.75rem] cursor-pointer shrink-0"
        />
      </template>

      <div
        class="mt-2 bg-ldsa-bg border-2 border-ldsa-grey rounded-lg pt-4 font-semibold text-center text-ldsa-text-default"
      >
        <h1>Alternar sistema</h1>
        <NuxtLink v-if="$route.path.includes('sisgha')" to="/sisgea/reservas">
          <LogoSISGEALogomarca
            class="cursor-pointer box-content w-[8.75rem] shrink-0 p-5"
          />
        </NuxtLink>

        <NuxtLink v-else-if="$route.path.includes('sisgea')" to="/sisgha/dape">
          <LogoSISGHALogomarca
            class="cursor-pointer box-content w-[8.75rem] shrink-0 p-5"
          />
        </NuxtLink>
      </div>
    </UIPopover>
  </header>
</template>
