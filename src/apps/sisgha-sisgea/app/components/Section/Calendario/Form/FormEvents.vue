<script lang="ts" setup>
// # IMPORT
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type { CalendarEvent } from '../Types';
import {
  useInjectCalendarioEvents,
  useOnCalendarioForceClose,
} from '../useCalendarioEventBus';

// # CODE
type Props = {
  events?: CalendarEvent[];
};

const props = defineProps<Props>();

// # EMITS
const $emit = defineEmits(['close', 'refresh']);

const calendarioEvents = useInjectCalendarioEvents();

function onClose() {
  $emit('close');
  calendarioEvents.emitEventsUpdated();
}

useOnCalendarioForceClose(onClose);
</script>

<template>
  <form @submit.prevent="onClose">
    <DialogModalBaseLayout :on-close="onClose" :title="'Eventos'">
      <SearchBar />

      <div class="u-flex u-flex-col u-w-full u-h-full">
        <SectionCalendarioEvent
          v-for="event in props.events"
          :key="event.id"
          :event="event"
          :calendar-id="event.calendar?.id ?? ''"
          @refresh="$emit('refresh')"
        />
      </div>

      <!-- Buttons -->
      <template #button-group>
        <UIButtonModalCancel
          type="close"
          class="u-flex u-w-full"
          @click="onClose"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
