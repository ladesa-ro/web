<script lang="ts" setup>
// # IMPORT
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as yup from 'yup';
import { calendarDataMethods } from '../../CalendarDataMethods';

// # CODE
type Props = {
  calendarId: string;
  eventName?: string;
};

const props = defineProps<Props>();
const isLoading = ref(true);

const getEvent = async () => {
  const checkEvents = await calendarDataMethods.events.getEventByName(
    props.eventName!,
    props.calendarId!
  );

  const checkSteps = await calendarDataMethods.steps.getStepByName(
    props.eventName!,
    props.calendarId!
  );

  if (checkEvents) {
    isEvent.value = true;
    await setValues({
      eventName: `${checkEvents.nome}° Etapa`,
      eventEnvironment: checkEvents.ambiente,
      eventColor: checkEvents.cor,
      eventStartDate: checkEvents.dataInicio,
      eventStartHour: checkEvents.horaInicio,
      eventEndDate: checkEvents.dataFim,
      eventEndHour: checkEvents.horaFim,
    });
  } else if (checkSteps) {
    isEvent.value = false;
    await setValues({
      eventName: checkSteps.nome,
      eventColor: checkSteps.cor,
      eventStartDate: checkSteps.dataInicio,
      eventStartHour: undefined,
      eventEndDate: checkSteps.dataFim,
      eventEndHour: undefined,
      eventEnvironment: undefined,
    });
  }
};

let isEvent = ref<boolean | null>(null);

type FormValues = {
  eventName: string;
  eventEnvironment?: string;
  eventColor: string;
  eventStartDate: string;
  eventStartHour?: string;
  eventEndDate: string;
  eventEndHour?: string;
};

// Event - Data
const schemaCalendar = yup.object({
  eventName: yup.string().required('Nome inválido'),
  eventEnvironment: yup.string().notRequired(),
  eventColor: yup.string().required('Cor inválida'),
  eventStartDate: yup.date().required('Data de início inválida'),
  eventStartHour: yup
    .string()
    .notRequired()
    .test('valid-hour', 'Horário de início inválido', async hour => {
      return await calendarDataMethods.check.validHour(hour);
    }),
  eventEndDate: yup.date().required('Data de término inválida'),
  eventEndHour: yup
    .string()
    .notRequired()
    .test('valid-hour', 'Horário de término inválido', async hour => {
      return await calendarDataMethods.check.validHour(hour);
    }),
});

const { values, validate, setValues } = useForm<FormValues>({
  validationSchema: schemaCalendar,
  initialValues: {
    eventName: '',
    eventColor: '',
    eventStartDate: '',
    eventStartHour: '',
    eventEndDate: '',
    eventEndHour: '',
    eventEnvironment: '',
  },
});

async function onSubmit() {
  if (isEvent.value) {
    await calendarDataMethods.events.putEvent({
      id: props.eventName!,
      name: values.eventName,
      color: values.eventColor,
      startDate: values.eventStartDate,
      endDate: values.eventEndDate,
      calendar: { id: props.calendarId },
    });
  } else {
    await calendarDataMethods.events.postEvent(
      values.eventName,
      values.eventColor,
      { date: values.eventStartDate, hour: values.eventStartHour },
      { date: values.eventEndDate, hour: values.eventEndHour },
      props.calendarId
    );
  }
}

const validateEventCrud = async (): Promise<boolean> => {
  const { valid } = await validate();
  if (!valid) return false;
  else {
    await onSubmit();
    return true;
  }
};

const formReady = ref(false);

onMounted(async () => {
  formReady.value = true;
  if (props.eventName) {
    await getEvent();
  }
  isLoading.value = false;
});

const fillForm = async () => {
  if (!formReady.value) {
    await new Promise<void>(resolve => {
      const stop = watch(formReady, ready => {
        if (ready) {
          resolve();
          stop();
        }
      });
    });
  }

  if (props.eventName) {
    await getEvent();
  }
};

defineExpose({ validateEventCrud, fillForm });
</script>

<template>
  <div>
    <!-- Event - Data -->
    <div v-if="!isLoading" class="flex flex-col gap-4 overflow-visible mt-1">
      <VVTextField
        name="eventName"
        type="text"
        label="Nome"
        placeholder="Digite aqui"
        v-model="values.eventName"
        :disabled="!!isEvent"
      />
      <VVAutocompleteAPIAmbiente
        name="eventEnvironment"
        type="text"
        label="Ambientes"
        placeholder="Digite aqui"
        v-model="values.eventEnvironment"
      />

      <VVTextField
        name="eventColor"
        type="color"
        label="Cor"
        v-model="values.eventColor"
      />

      <div class="flex gap-4">
        <VVTextField
          name="eventStartDate"
          type="date"
          label="Início"
          v-model="values.eventStartDate"
          class="flex-1 flex-col"
        />
        <VVTextField
          name="eventStartHour"
          type="hour"
          label="Horario de início"
          v-model="values.eventStartHour"
        />
      </div>

      <div class="flex gap-4">
        <VVTextField
          name="eventEndDate"
          type="date"
          label="Término"
          v-model="values.eventEndDate"
        />
        <VVTextField
          name="eventEndHour"
          type="hour"
          label="Horario de Término"
          v-model="values.eventEndHour"
        />
      </div>
    </div>
  </div>
</template>
