<script lang="ts" setup>
const cargos = useCampusContextCargos();

const canChangeProfile = computed(() => cargos.value.length > 1);

//

const open = ref(false);
</script>

<template>
  <UIPopover v-model="open" :disabled="!canChangeProfile">
    <template #activator>
      <AppbarProfileCard :can-change-profile="canChangeProfile">
        <template #arrowIcon>
          <ClientOnly>
            <IconsArrow
              v-if="canChangeProfile"
              :class="{ down: open }"
              class="profile-card-arrow-icon"
            />
          </ClientOnly>
        </template>
      </AppbarProfileCard>
    </template>

    <ClientOnly>
      <SectionUsuariosModalsAccessRole @close="open = false" />
    </ClientOnly>
  </UIPopover>
</template>

<style scoped>
.profile-card-arrow-icon {
  color: var(--ladesa-text-green-color);
  transition-property: transform;
  transition-duration: 300ms;
  transform: rotate(-90deg);
}

.arrow.down {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}
</style>
