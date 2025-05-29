<script setup lang="ts">
// TODO: ver lógica utilizada na tela de visualização de perfil de outro usuário
type Props = { id?: string };
defineProps<Props>();
</script>

<template>
  <UIContainer variant="large">
    <header class="flex justify-between">
      <span class="flex gap-6 font-semibold text-lg">
        <NuxtLink to="../horario">
          <IconsArrowIconArrowAlt class="w-6 text-ldsa-grey" />
        </NuxtLink>

        <UITitle text="Visualização de Horário - Técnico em Informática - 3° A" />
      </span>


      <button
        class="flex items-center gap-2.5 py-2 px-3 border-3 border-ldsa-purple rounded-lg text-ldsa-purple font-semibold transition-[background-color] hover:bg-ldsa-purple/10"
      >
        Modo Edição
        <IconsIconEdit class="mb-0.5" />
      </button>
    </header>

    <!-- TODO: adicionar horário da semana -->
  </UIContainer>
</template>
