<script setup>
const open = ref(false);
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <span class="max-[740px]:hidden">
        <LogoSISGHALogomarca
          v-if="$route.path.includes('sisgha')"
          class="w-[8.75rem] cursor-pointer shrink-0"
        />
        <LogoSISGEALogomarca
          v-else-if="$route.path.includes('sisgea')"
          class="w-[8.75rem] cursor-pointer shrink-0"
        />
      </span>

      <div class="min-[740px]:hidden p-2.5">
        <LogoSISGHALogo class="w-5.5" />
      </div>
    </template>

    <div
      class="mt-2 bg-ldsa-bg border-2 border-ldsa-grey rounded-lg p-4 font-semibold text-center text-ldsa-text-default"
    >
      <UITitle variant="mini" text="Alternar sistema" class="mb-2" />

      <NuxtLink v-if="$route.path.includes('sisgha')" to="/sisgea/reservas">
        <LogoSISGEALogomarca
          class="box-content w-[8.75rem] shrink-0 p-3.5 hover:bg-ldsa-grey/15 rounded-lg"
        />
      </NuxtLink>

      <NuxtLink v-else-if="$route.path.includes('sisgea')" to="/sisgha/dape">
        <LogoSISGHALogomarca
          class="box-content w-[8.75rem] shrink-0 p-3.5 hover:bg-ldsa-grey/15 rounded-lg"
        />
      </NuxtLink>

      <UIButtonModalCancel
        @click="open = false"
        variant="small"
        class="mt-3 w-full"
      />
    </div>
  </UIPopover>
</template>
