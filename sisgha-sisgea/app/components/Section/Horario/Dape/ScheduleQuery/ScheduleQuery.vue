<script setup lang="ts">
const id = useRoute().params.id;

const editMode = ref(false);
</script>

<template>
  <UIContainer variant="large">
    <header class="flex justify-between items-center">
      <span class="flex gap-6 font-semibold text-lg" v-show="!editMode">
        <NuxtLink to="../horario" class="flex items-center justify-center">
          <IconsArrowIconArrowAlt class="w-5 text-ldsa-grey" />
        </NuxtLink>

        <UITitle class="default" text="Técnico em Informática - 3° A" />
      </span>

      <UITitle class="default" text="Modo Edição - Técnico em Informática - 3° A" v-if="editMode" />
      <button
        class="border-ldsa-text-green text-ldsa-text-green hover:bg-ldsa-text-green/10"
        v-show="!editMode"
        @click="editMode = true"
      >
        Modo Edição
        <IconsIconEdit class="mb-0.5" />
      </button>

      <span v-if="editMode" class="flex gap-2">
        <button
          class="border-ldsa-red text-ldsa-red hover:bg-ldsa-red/10"
          @click="editMode = false"
        >
          <IconsIconClose class="w-5" />
        </button>
        <button
          class="border-ldsa-green-2 text-ldsa-green-2 hover:bg-ldsa-green-2/10"
          @click="editMode = false"
        >
          <IconsIconConfirm class="w-6" />
        </button>
      </span>
    </header>

    <!-- TODO: adicionar horário da semana -->
  </UIContainer>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

button {
  @apply flex items-center justify-center gap-2 min-w-12 h-12 py-3 px-2 border-3 rounded-lg font-semibold transition-[background-color];
}

/* class used to win the specifity of UITitle's 'default' class */
.default {
  @apply text-lg mb-0 h-max;
}
</style>
