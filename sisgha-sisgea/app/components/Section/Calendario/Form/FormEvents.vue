<script lang="ts" setup>
// # IMPORT
import { ref } from 'vue';
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type { CalendarEvent } from '../Types';
import Events from './Crud/Events.vue';

// # CODE
type Props = {
  events?: CalendarEvent[];
};

const props = defineProps<Props>();

const showEventModal = ref(false);
const selectedEventName = ref<string | null>(null);
const eventCrudRef = ref<InstanceType<typeof Events> | null>(null);

onMounted(() => {
  window.addEventListener('force-close-inner-modals', closeEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener('force-close-inner-modals', closeEvent);
});

// # EMITS
const $emit = defineEmits(['close', 'refresh']);

function onClose() {
  $emit('close');
}

function openEvent(name?: string) {
  selectedEventName.value = name ?? null;
  showEventModal.value = true;
}

function closeEvent() {
  showEventModal.value = false;
  selectedEventName.value = null;
}

async function saveEvent() {
  if (await eventCrudRef.value?.validateEventCrud()) {
    closeEvent();
    $emit('refresh');
  }
}

console.log(props.events);
</script>

<template>
  <form @submit.prevent="onClose">
    <DialogModalBaseLayout :on-close="onClose" :title="'Eventos'">
      <SearchBar />

      <div class="flex flex-col w-full h-full">
        <SectionCalendarioEvent
          v-for="event in props.events"
          :event="event"
          :calendar-id="event.calendar!.id"
          @refresh="$emit('refresh')"
        />
      </div>

      <!-- Buttons -->
      <template #button-group>
        <UIButtonModalCancel
          @click="onClose"
          type="close"
          class="flex w-full"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
