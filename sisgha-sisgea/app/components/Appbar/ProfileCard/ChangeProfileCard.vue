<script lang="ts" setup>
import { useApiContext } from '../../API/Context/setup-context';

const { resumoVinculos } = useApiContext();

const canChangeProfile = computed(
  () => resumoVinculos.value.cargos.length >= 2
);

//

const open = ref(false);
</script>

<template>
  <UIPopover v-model="open">
    <template #activator>
      <AppbarProfileCard :can-change-profile="canChangeProfile">
        <template #arrowIcon>
          <ClientOnly>
            <IconsArrow
              v-if="canChangeProfile"
              :class="{ down: open }"
              class="arrow -rotate-90"
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

.arrow {
  @apply text-ldsa-text-green;
  @apply transition-transform duration-300;
}

.arrow.down {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}
</style>
