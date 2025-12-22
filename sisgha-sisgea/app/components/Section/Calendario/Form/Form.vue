<script lang="ts" setup>
// # IMPORTS
import IconCalendar from '@/components/Icons/Calendar/Calendar.vue';
import IconEvent from '@/components/Icons/Event.vue';
import { nextTick, ref, watch } from 'vue';
import type { CalendarEvent } from '../Types';

// # PROPS
type Props = {
  calendarId?: string;
  eventName?: string;
  editMode?: 'calendar' | 'events' | null;
};
const props = defineProps<Props>();

// # EMITS
const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'close'): void;
}>();

// # STATES
const events = ref<CalendarEvent[]>([]);
const stage = ref(0);
const registerType = ref<'calendar' | 'events' | null>(null);
const modalTitle = ref(props.editMode ? 'Editar' : 'Cadastrar');

const calendarCrudRef = ref<any>();
const eventCrudRef = ref<any>();

// # ICONS
const cardIcons = [
  { text: 'Calendário', value: 0, icon: IconCalendar },
  { text: 'Evento', value: 1, icon: IconEvent },
];

// # FUNCTIONS
function changeModalTitle(type?: string) {
  if (props.editMode) {
    modalTitle.value =
      props.editMode === 'calendar' ? 'Editar calendário' : 'Editar evento';
  } else {
    if (stage.value === 0) modalTitle.value = 'Cadastrar';
    else
      modalTitle.value = `Cadastrar ${
        type === 'calendar' ? 'calendário' : 'eventos'
      }`;
  }
}

function selectRegisterType(type: string | null) {
  if (type === 'Calendário') registerType.value = 'calendar';
  else if (type === 'Evento') registerType.value = 'events';
  else registerType.value = null;

  changeModalTitle(String(registerType.value));
}

function onClose() {
  emit('close');
}

async function formStage(v: 'next' | 'prev') {
  if (calendarCrudRef && stage.value > 0) {
    if (v === 'next' && (await calendarCrudRef.value.formValidation()))
      stage.value++;
    else if (v === 'prev') stage.value--;
  } else {
    stage.value = v === 'next' ? stage.value + 1 : stage.value - 1;
  }

  if (stage.value === 0) selectRegisterType(null);
  changeModalTitle(String(registerType.value));
}

async function onSubmit() {
  if (registerType.value === 'calendar' || props.editMode === 'calendar') {
    if (calendarCrudRef.value) {
      const valid = await calendarCrudRef.value.validCalendarCrud();
      if (valid) {
        emit('refresh');
        onClose();
      }
    }
  } else if (registerType.value === 'events' || props.editMode === 'events') {
    if (eventCrudRef.value) {
      const valid = await eventCrudRef.value.validateEventCrud();
      if (valid) {
        emit('refresh');
        onClose();
      }
    } else {
      console.warn('eventCrudRef ainda não está montado!');
    }
  }
}

watch(
  () => props.eventName,
  async newEventName => {
    if (newEventName) {
      await nextTick();
      eventCrudRef.value?.fillForm();
    }
  },
  { immediate: true }
);

if (props.editMode) {
  registerType.value = props.editMode;
  changeModalTitle();
}

async function handleDelete() {
  console.log('Botão de deletar clicado');

  await nextTick();

  if (!eventCrudRef.value) {
    console.warn('⚠️ eventCrudRef ainda não está montado!');
    return;
  }

  if (!props.eventName || !props.calendarId) {
    console.warn(
      '⚠️ Falta props.eventName ou props.calendarId:',
      props.eventName,
      props.calendarId
    );
    return;
  }

  try {
    const deleted = await eventCrudRef.value.deleteEvent();
    console.log('deleteEvent retornou:', deleted);

    if (deleted) {
      emit('refresh');
      onClose();
      console.log('✅ Evento deletado com sucesso, modal fechado');
    } else {
      console.warn('⚠️ deleteEvent não conseguiu deletar');
    }
  } catch (err) {
    console.error('❌ Erro ao chamar deleteEvent:', err);
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout
      :on-close="onClose"
      :title="modalTitle"
      class="min-w-[550px]"
    >
      <!-- Choose Register -->
      <div v-show="stage === 0 && !props.editMode" class="flex flex-row gap-4">
        <SectionCalendarioUICardOption
          class="w-full"
          :icon="cardIcons[0]!.icon"
          :text="cardIcons[0]!.text"
          @click="(selectRegisterType(cardIcons[0]!.text), formStage('next'))"
        />

        <SectionCalendarioUICardOption
          class="w-full"
          v-show="props.calendarId"
          :icon="cardIcons[1]!.icon"
          :text="cardIcons[1]!.text"
          @click="(selectRegisterType(cardIcons[1]!.text), formStage('next'))"
        />
      </div>

      <!-- Calendar Form -->
      <SectionCalendarioFormCrudCalendar
        ref="calendarCrudRef"
        v-show="registerType === 'calendar' || props.editMode === 'calendar'"
        :form-stage="stage"
      />

      <!-- Event Form -->
      <SectionCalendarioFormCrudEvents
        ref="eventCrudRef"
        v-show="
          props.editMode === 'events' ||
          (registerType === 'events' && stage > 0)
        "
        :form-stage="stage"
        :calendar-id="props.calendarId! || ''"
        :event-name="props.eventName"
      />

      <!-- Buttons -->
      <template #button-group>
        <UIButtonModalGoBack
          v-show="stage > 0 && !props.editMode"
          @click.prevent="formStage('prev')"
          class="flex w-full"
        />
        <UIButtonModalCancel
          @click="onClose"
          type="close"
          class="flex w-full"
        />
        <UIButtonModalDelete
          v-show="props.editMode === 'events'"
          @click.prevent="handleDelete"
          class="flex w-full"
        />

        <UIButtonModalAdvance
          v-if="stage < 3 && stage > 0 && registerType !== 'events'"
          @click.prevent="formStage('next')"
          class="flex w-full"
        />
        <UIButtonModalSave
          v-else-if="stage > 0 && (registerType === 'events' || stage > 2)"
          type="submit"
          @click="onSubmit"
        />
        <UIButtonModalEdit v-show="props.editMode" type="submit" />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
