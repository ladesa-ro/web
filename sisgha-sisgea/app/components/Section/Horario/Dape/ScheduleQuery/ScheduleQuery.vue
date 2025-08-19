<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import ButtonsEditMode from './Buttons/ButtonsEditMode.vue';
import ButtonsVisualizationMode from './Buttons/ButtonsVisualizationMode.vue';
import { getOwnerName } from './getOwnerName';

const id = useRoute().params.id as string;

const isProfessor = useRoute().path.includes('professor');

const {
  data: scheduleOwner,
  isLoading,
  isError,
} = isProfessor
  ? useQuery(findUserById({ id }))
  : useQuery(findTurmaById({ id }));

const ownerName = getOwnerName(isLoading, isProfessor, scheduleOwner);

//

const editMode = ref(false);
</script>

<template>
  <UIContainer variant="larger">
    <header class="flex justify-between items-center">
      <span class="flex gap-6 font-semibold text-lg">
        <NuxtLink
          v-show="!editMode"
          to="../../horario"
          class="flex items-center justify-center"
        >
          <IconsArrowAlt class="w-5 text-ldsa-grey" />
        </NuxtLink>

        <UITitle
          v-if="isError"
          class="default"
          text="Não foi possível buscar os dados"
        />

        <UITitle v-else-if="isLoading" class="default" text="Carregando..." />

        <UITitle
          v-else-if="!editMode"
          class="default"
          :text="ownerName ?? 'Nome não disponível'"
        />

        <UITitle
          v-if="editMode"
          class="default"
          :text="'Modo Edição - ' + ownerName"
        />
      </span>

      <ButtonsVisualizationMode v-show="!editMode" v-model="editMode" />
      <ButtonsEditMode v-if="editMode" v-model="editMode" />
    </header>

    <SectionHorarioDapeEditGrid />
  </UIContainer>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

/* class used to win the specifity of UITitle's 'default' class */
.default {
  @apply text-lg h-max;
}
</style>
