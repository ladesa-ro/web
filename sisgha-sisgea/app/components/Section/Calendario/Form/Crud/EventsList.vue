<template>
  <DialogModalBaseLayout
    v-if="showEventModal"
    :on-close="closeModal"
    title="Ver Eventos"
  >
    <div class="mt-1">
      <SearchBar v-model="searchQuery" placeholder="Buscar evento..." />
    </div>

    <div class="flex gap-2 mt-1 border-b-2 border-b-ldsa-grey pb-4">
      <VVAutocomplete
        :items="sortOptions"
        :model-value="sortBy"
        @update:modelValue="sortBy = $event"
        class="w-full"
        label="Classificar por"
        name="sortBy"
        placeholder="Selecione uma opção"
      />

      <VVAutocomplete
        :items="orderOptions"
        :model-value="sortOrder"
        @update:modelValue="sortOrder = $event"
        class="w-1/2"
        label="Ordem"
        name="sortOrder"
        placeholder="Selecione a ordem"
      />
    </div>

    <!-- Lista de eventos -->
    <div
      class="flex flex-col w-full h-full gap-4 mt-1 overflow-y-auto max-h-[60vh]"
    >
      <SectionCalendarioEvent
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        :calendar-id="event.calendar!.id"
        @refresh="$emit('refresh')"
      />
      <p
        v-if="filteredEvents.length === 0"
        class="text-center text-gray-500 mt-4"
      >
        Nenhum evento encontrado.
      </p>
    </div>

    <template #button-group>
      <UIButtonModalCancel
        @click="closeModal"
        type="close"
        class="flex w-full"
      />
    </template>
  </DialogModalBaseLayout>
</template>

<script lang="ts" setup>
import { UIButtonModalCancel, VVAutocomplete } from '#components';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import DialogModalBaseLayout from '~/components/Dialog/Modal/ModalBaseLayout.vue';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type { CalendarEvent } from '../../Types';
import SectionCalendarioEvent from '../Crud/Events.vue';

const props = defineProps<{ events: CalendarEvent[] }>();
const $emit = defineEmits(['close', 'refresh']);

const showEventModal = ref(true);
const searchQuery = ref('');
const sortBy = ref<'name' | 'startDate' | 'endDate'>('startDate');
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortOptions = [
  { label: 'Nome', value: 'name' },
  { label: 'Data de início', value: 'startDate' },
  { label: 'Data de término', value: 'endDate' },
];

const orderOptions = [
  { label: 'Crescente', value: 'asc' },
  { label: 'Decrescente', value: 'desc' },
];

function closeModal() {
  showEventModal.value = false;
  $emit('close');
}

function handleForceClose() {
  closeModal();
}

onMounted(() => {
  window.addEventListener('force-close-inner-modals', handleForceClose);
});
onBeforeUnmount(() => {
  window.removeEventListener('force-close-inner-modals', handleForceClose);
});

// Computed
const filteredEvents = computed(() => {
  let result = props.events;

  // filtro por pesquisa
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(event => event.name.toLowerCase().includes(query));
  }

  // ordenação
  result = [...result].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy.value) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'startDate':
        aValue = new Date(a.startDate).getTime();
        bValue = new Date(b.startDate).getTime();
        break;
      case 'endDate':
        aValue = new Date(a.endDate).getTime();
        bValue = new Date(b.endDate).getTime();
        break;
    }

    return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return result;
});
</script>

<style scoped>
.flex-col.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
.flex-col.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.flex-col.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
</style>
