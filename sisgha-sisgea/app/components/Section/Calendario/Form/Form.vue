<script lang="ts" setup>
// # IMPORT
import IconCalendar from '@/components/Icons/Calendar/Calendar.vue';
import IconEvent from '@/components/Icons/Event.vue';

// # CODE
type Props = {
  calendarId?: string;
  eventName?: string;
  editMode?: 'calendar' | 'events' | null;
};

const props = defineProps<Props>();

// Icons
const cardIcons = [
  { text: 'Calendário', value: 0, icon: IconCalendar },
  { text: 'Evento', value: 1, icon: IconEvent },
];

let modalTitle = ref(props.editMode ? 'Editar' : 'Cadastrar');

function changeModalTitle(type?: string) {
  if (props.editMode) {
    if (props.editMode === 'calendar') modalTitle.value = 'Editar calendário';
    else if (props.editMode === 'events') modalTitle.value = 'Editar evento';
  } else {
    if (stage.value === 0) modalTitle.value = 'Cadastrar';
    else {
      modalTitle.value = `Cadastrar ${type === 'calendar' ? 'calendário' : 'eventos'}`;
    }
  }
}

// Form stages
const stages = ['Choose', 'Steps', 'Recovery'];

let stage = ref(0);

async function formStage(v: string) {
  if (v === 'next') stage.value++;
  else if (v === 'prev') stage.value--;

  changeModalTitle(String(registerType.value));
}

let registerType = ref<'calendar' | 'events' | null>(null);

if (props.editMode) {
  registerType.value = props.editMode;
  changeModalTitle();
}

function selectRegisterType(type: string | null) {
  if (type) {
    if (type == 'Calendário') registerType.value = 'calendar';
    else if (type == 'Evento') registerType.value = 'events';

    changeModalTitle(String(registerType.value));
  }
}

// # EMITS
const $emit = defineEmits(['close']);

function onClose() {
  alert('Successful');
  $emit('close');
}

let submitForm = ref<boolean>(false);

const eventCrudRef = ref();
const calendarCrudRef = ref();

async function onSubmit() {
  alert('In work');
  submitForm.value = true;
}

await watch(
    () => eventCrudRef.value?.submitEvent,
    n => {
      if (n === true) {
        onClose();
      }
    }
  );
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout :on-close="onClose" :title="modalTitle">
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

      <!-- Calendar -->
      <SectionCalendarioFormCrudCalendar
        ref="calendarCrudRef"
        v-show="registerType === 'calendar' || props.editMode === 'calendar'"
        :form-stage="stage"
      />

      <!-- Events -->
      <SectionCalendarioFormCrudEvents
        ref="eventCrudRef"
        v-show="
          (registerType === 'events' && stage > 0) ||
          props.editMode === 'events'
        "
        :form-stage="stage"
        :calendar-id="props.calendarId!"
        :event-name="props.eventName"
        :submit="submitForm"
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
          v-show="props.editMode"
          @click.prevent=""
          class="flex w-full"
        />
        <UIButtonModalAdvance
          v-if="stage < stages.length && stage > 0 && registerType !== 'events'"
          @click.prevent="formStage('next')"
          class="flex w-full"
        />
        <UIButtonModalSave
          v-else-if="
            (stage > stages.length - 1 && stage > 0) ||
            (stage > 0 && registerType === 'events')
          "
          type="submit"
          @click="onSubmit"
        />
        <UIButtonModalEdit v-show="props.editMode" type="submit" />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
