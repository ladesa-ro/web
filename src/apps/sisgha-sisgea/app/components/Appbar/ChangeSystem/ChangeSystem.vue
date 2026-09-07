<script setup>
const open = ref(false);

const cargos = useCampusContextCargos();

const cargoPrecedencia = ['dape', 'professor'];

const sisghaTo = computed(() => {
  const matched = cargoPrecedencia.find(c => cargos.value.includes(c));
  const cargo = matched ?? cargos.value[0];
  if (!cargo || typeof cargo !== 'string') return '/sisgha/dape/';
  return `/sisgha/${cargo}/`;
});
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <span class="system-logo-wrap">
        <LogoSISGHALogomarca
          v-if="$route.path.includes('sisgha')"
          class="u-shrink-0 system-logo"
        />
        <LogoSISGEALogomarca
          v-else-if="$route.path.includes('sisgea')"
          class="u-shrink-0 system-logo"
        />
      </span>

      <div class="u-p-2-5 system-logo-icon-wrap">
        <LogoSISGHALogo class="system-logo-icon" />
      </div>
    </template>

    <div
      class="u-mt-2 u-rounded-lg u-p-4 u-font-semibold u-text-center system-popover-panel"
    >
      <UITitle variant="mini" text="Alternar sistema" class="u-mb-2" />

      <NuxtLink v-if="$route.path.includes('sisgha')" to="/sisgea/reservas">
        <LogoSISGEALogomarca
          class="u-shrink-0 u-p-3-5 u-rounded-lg system-logo-option"
        />
      </NuxtLink>

      <NuxtLink v-else-if="$route.path.includes('sisgea')" :to="sisghaTo">
        <LogoSISGHALogomarca
          class="u-shrink-0 u-p-3-5 u-rounded-lg system-logo-option"
        />
      </NuxtLink>

      <UIButtonModalCancel
        variant="small"
        class="u-mt-3 u-w-full"
        @click="open = false"
      />
    </div>
  </UIPopover>
</template>

<style scoped>
.system-logo-wrap {
  display: inline;
}

@media (max-width: 740px) {
  .system-logo-wrap {
    display: none;
  }
}

.system-logo {
  width: 8.75rem;
  cursor: pointer;
}

.system-logo-icon-wrap {
  display: none;
}

@media (max-width: 740px) {
  .system-logo-icon-wrap {
    display: block;
  }
}

.system-logo-icon {
  width: 1.375rem;
}

.system-popover-panel {
  background-color: var(--ladesa-background-color);
  border: 2px solid var(--ladesa-grey-color);
  color: var(--ladesa-text-default-color);
}

.system-logo-option {
  box-sizing: content-box;
  width: 8.75rem;
}

.system-logo-option:hover {
  background-color: rgb(from var(--ladesa-grey-color) R G B / 15%);
}
</style>
