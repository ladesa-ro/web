<script setup lang="ts">
import { ref } from 'vue';
import { useApiContext } from '../../API/Context/setup-context';

const { resumoVinculos } = useApiContext();

const canChangeProfile = computed(
  () => resumoVinculos.value.cargos.length >= 2
);

//

const isActive = ref(false);
</script>

<template>
  <v-menu
    v-model="isActive"
    origin="auto"
    location="bottom center"
    transition="slide-y-transition"
    :close-on-content-click="false"
    :disabled="!canChangeProfile"
  >
    <!-- configuration to show the modal-->
    <template #activator="{ props }">
      <AppbarProfileCard :can-change-profile="canChangeProfile" v-bind="props">
        <template #arrowIcon>
          <ClientOnly>
            <IconsArrowIconArrow
              v-if="canChangeProfile"
              class="arrow -rotate-90"
              :class="{ down: isActive }"
            />
          </ClientOnly>
        </template>
      </AppbarProfileCard>
    </template>

    <!-- modal that will be shown if the component is clicked -->
    <ClientOnly>
      <SectionUsuariosModalsAccessRole @close="isActive = false" />
    </ClientOnly>
  </v-menu>
</template>

<style scoped>
.arrow {
  @apply text-ldsa-text-green;
  -moz-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
}

.arrow.down {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
</style>
