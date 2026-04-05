<script lang="ts" setup>
// # IMPORT
import SearchBar from '~/components/UI/SearchBar/SearchBar.vue';
import type { CalendarEvent } from '../Types';

// # CODE
type Props = {
  events?: CalendarEvent[];
};

const props = defineProps<Props>();

// # EMITS
const $emit = defineEmits(['close', 'refresh']);

function onClose() {
  $emit('close');
  window.dispatchEvent(new CustomEvent('calendar-events-updated'));
}

onMounted(() => {
  window.addEventListener('force-close-inner-modals', onClose);
});

onBeforeUnmount(() => {
  window.removeEventListener('force-close-inner-modals', onClose);
});

</script>

<template>
  <form @submit.prevent="onClose">
    <DialogModalBaseLayout :on-close="onClose" :title="'Eventos'">
      <SearchBar />

      <div class="flex flex-col w-full h-full">
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
          class="flex w-full"
          @click="onClose"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
