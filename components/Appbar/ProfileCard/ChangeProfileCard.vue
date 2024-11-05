<script setup lang="ts">
import { ref } from 'vue';
import { useApiContext } from '../../API/Context/setup-context';

const { resumoPerfis } = useApiContext();

const canChangeProfile = computed(() => resumoPerfis.value.cargos.length >= 2);

const isActive = ref(false);
</script>

<template>
  <v-menu
    origin="auto"
    v-model="isActive"
    location="bottom center"
    transition="slide-y-transition"
    :close-on-content-click="false"
    :disabled="!canChangeProfile"
  >
    <!-- configuration to show the modal-->
    <template v-slot:activator="{ props }">
      <AppbarProfileCard :can-change-profile="canChangeProfile" v-bind="props">
        <template #arrowIcon>
          <ClientOnly>
            <IconsArrowIconArrow
              v-if="canChangeProfile"
              class="arrow -rotate-90 cursor-pointer -icon-green"
              :class="{ down: isActive }"
            />
          </ClientOnly>
        </template>
      </AppbarProfileCard>
    </template>

    <!-- modal that will be shown if the arrow icon is clicked -->
    <ClientOnly>
      <SectionUsuariosModalsAccessRole @close="isActive = false" />
    </ClientOnly>
  </v-menu>
</template>

<style scoped>
.arrow {
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
