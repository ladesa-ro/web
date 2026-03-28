<script lang="ts" setup>
const cargos = useCampusContextCargos();

const canChangeProfile = computed(() => cargos.value.length > 1);

//

const open = ref(false);
</script>

<template>
  <UIPopover :disabled="!canChangeProfile" v-model="open">
    <template #activator>
      <AppbarProfileCard :can-change-profile="canChangeProfile">
        <template #arrowIcon>
          <ClientOnly>
            <IconsArrow
              v-if="canChangeProfile"
              :class="{ down: open }"
              class="text-ldsa-text-green transition-transform duration-300 -rotate-90"
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
@reference "~/assets/styles/app.css";

.arrow.down {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}
</style>
