<template>
  <DialogModalBaseLayout
    v-if="showEventModal"
    :on-close="closeModal"
    title="Eventos"
  >
    <SearchBar />
    <div class="flex flex-col w-full h-full gap-4 mt-2">
      <SectionCalendarioEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
        :calendar-id="event.calendar!.id"
        @refresh="$emit('refresh')"
      />
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import DialogModalBaseLayout from '~/components/Dialog/Modal/ModalBaseLayout.vue';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type { CalendarEvent } from '../../Types';
import SectionCalendarioEvent from '../Crud/Events.vue';

const props = defineProps<{ events: CalendarEvent[] }>();
const $emit = defineEmits(['close', 'refresh']);

const showEventModal = ref(true);

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
</script>
