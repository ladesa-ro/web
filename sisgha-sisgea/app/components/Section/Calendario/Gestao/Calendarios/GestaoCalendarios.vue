<script setup lang="ts">
import Card from './Card.vue';
</script>

<template>
  <UIContainer class="flex flex-col gap-6">
    <nav class="flex justify-between items-center">
      <UITitleWithGoBack to="../" text="Gestão de Calendários Acadêmicos" />

      <div class="flex gap-3.5">
        <NuxtLink to="./dias-nao-letivos">
          <UIButtonDefaultSquare>
            <IconsCalendarX class="w-6 h-full" />
          </UIButtonDefaultSquare>
        </NuxtLink>

        <!-- add EditOrCreateModal aqui -->
        <UIButtonDefaultSquare>
          <IconsAdd class="w-6 h-full" />
        </UIButtonDefaultSquare>
      </div>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 grid-flow-row">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </UIContainer>
</template>
