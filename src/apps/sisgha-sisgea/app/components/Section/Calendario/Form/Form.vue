<script lang="ts" setup>
// # IMPORTS
import { IconsCalendar, IconsEvent } from '#components';
import { nextTick, ref, watch } from 'vue';

// # PROPS
type Props = {
  calendarId?: string;
  eventName?: string;
  editMode?: 'calendar' | 'events' | null;
  showParticipants?: boolean;
};
const props = withDefaults(defineProps<Props>(), { showParticipants: false });

// # EMITS
const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'close'): void;
}>();

// # STATES
const stage = ref(0);
const registerType = ref<'calendar' | 'events' | null>(null);
const modalTitle = ref(props.editMode ? 'Editar' : 'Cadastrar');

const calendarCrudRef = ref<{ validCalendarCrud: () => Promise<boolean>; formValidation: () => Promise<boolean> }>();
const eventCrudRef = ref<{ validateEventCrud: () => Promise<boolean>; fillForm: () => Promise<void>; deleteEvent: () => Promise<boolean> }>();

// # ICONS
const cardCalendario = { text: 'Calendário' as const, value: 0, icon: IconsCalendar };
const cardEvento = { text: 'Evento' as const, value: 1, icon: IconsEvent };

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
  if (calendarCrudRef.value && stage.value > 0) {
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
  stage.value = 1;
  changeModalTitle();
}

async function handleDelete() {
  await nextTick();

  if (!eventCrudRef.value) return;
  if (!props.eventName || !props.calendarId) return;

  const deleted = await eventCrudRef.value.deleteEvent();
  if (deleted) {
    emit('refresh');
    onClose();
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
          :icon="cardCalendario.icon"
          :text="cardCalendario.text"
          @click="(selectRegisterType(cardCalendario.text), formStage('next'))"
        />

        <SectionCalendarioUICardOption
          v-show="props.calendarId"
          class="w-full"
          :icon="cardEvento.icon"
          :text="cardEvento.text"
          @click="(selectRegisterType(cardEvento.text), formStage('next'))"
        />
      </div>

      <!-- Calendar Form -->
      <SectionCalendarioFormCrudCalendar
        v-show="registerType === 'calendar' || props.editMode === 'calendar'"
        ref="calendarCrudRef"
        :form-stage="stage"
      />

      <!-- Event Form -->
      <SectionCalendarioFormCrudEvents
        v-show="
          props.editMode === 'events' ||
          (registerType === 'events' && stage > 0)
        "
        ref="eventCrudRef"
        :form-stage="stage"
        :calendar-id="props.calendarId ?? ''"
        :event-name="props.eventName"
        :show-participants="props.showParticipants"
      />

      <!-- Buttons -->
      <template #button-group>
        <UIButtonModalGoBack
          v-show="stage > 0 && !props.editMode"
          class="flex w-full"
          @click.prevent="formStage('prev')"
        />
        <UIButtonModalCancel
          type="close"
          class="flex w-full"
          @click="onClose"
        />
        <UIButtonModalDelete
          v-show="props.editMode === 'events'"
          class="flex w-full"
          @click.prevent="handleDelete"
        />

        <UIButtonModalAdvance
          v-if="stage === 1 && registerType === 'calendar' && !props.editMode"
          class="flex w-full"
          @click.prevent="formStage('next')"
        />
        <UIButtonModalSave
          v-else-if="stage > 0 && (registerType === 'events' || stage === 2)"
          type="submit"
          @click="onSubmit"
        />
        <UIButtonModalEdit v-show="props.editMode" type="submit" />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
