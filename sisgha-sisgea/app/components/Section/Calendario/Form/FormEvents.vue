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
const $emit = defineEmits(['close']);

function onClose() {
  $emit('close');
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
