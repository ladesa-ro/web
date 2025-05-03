<script setup lang="ts">
const notifications = [
  {
    id: 2,
    title: 'O evento IFRO Party foi agendado',
    description:
      'O evento IFRO Party, do calendário Superior 2025, foi agendado para 12/05 a 22/05.',
  },
  {
    id: 1,
    title: 'Novo evento cadastrado',
    description:
      'O evento IFRO Party foi cadastrado no calendário Superior 2025.',
  },
  {
    id: 3,
    title: 'Novo calendário cadastrado',
    description: 'O calendário Superior 2025 foi cadastrado.',
  },
];
</script>

<template>
  <section
    class="max-sm:max-w-[90vw] sm:max-w-[60vw] md:max-w-[50vw] lg:max-w-[40vw] min-w-36 lg:min-w-96 mr-3.5 border-[0.125rem] border-ldsa-green-1 rounded-lg bg-ldsa-bg"
  >
    <!-- notification -->
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="p-2 px-2.5 sm:p-2.5 sm:px-3 border-b-2 border-b-ldsa-grey/50 last:border-b-0"
    >
      <h1 class="font-semibold">{{ notification.title }}</h1>

      <p class="mt-1 text-sm font-medium text-ldsa-text-default/50">
        {{ notification.description }}
      </p>
    </div>
  </section>
</template>
