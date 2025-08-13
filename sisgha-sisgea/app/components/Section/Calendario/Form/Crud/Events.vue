<script lang="ts" setup>
// # IMPORT
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { calendarDataMethods } from '../../CalendarDataMethods';

// # CODE
type Props = {
  calendarId: string;
  eventName?: string;
  submit?: boolean;
};

const props = defineProps<Props>();

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
    values.eventName = `${checkEvents.nome}° Etapa`;
    values.eventEnvironment = checkEvents.ambiente;
    values.eventColor = checkEvents.cor;
    values.eventStartDate = checkEvents.dataInicio;
    values.eventStartHour = checkEvents.horaInicio;
    values.eventEndDate = checkEvents.dataFim;
    values.eventEndHour = checkEvents.horaFim;
  } else {
    isEvent.value = false;
    values.eventName = checkSteps.nome;
    values.eventColor = checkSteps.cor;
    values.eventStartDate = checkSteps.dataInicio;
    values.eventEndDate = checkSteps.dataFim;
  }
};

let isEvent = ref<boolean | null>(null);

if (props.eventName) {
  getEvent();
}

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
  eventStartHour: yup.string().notRequired(),
  eventEndDate: yup.date().required('Data de término inválida'),
  eventEndHour: yup.string().notRequired(),
});

const { handleSubmit, values, errors, setFieldValue } = useForm<FormValues>({
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

let submitEvent = ref<boolean>(false);

defineExpose({
  submitEvent,
});

async function onSubmit() {
  await calendarDataMethods.events.postEvent(
    values.eventName,
    values.eventColor,
    {
      date: values.eventStartDate,
      hour: values.eventStartHour,
    },
    {
      date: values.eventEndDate,
      hour: values.eventEndHour,
    },
    props.calendarId
  );
}

await watch(
  () => props.submit,
  async n => {
    if (n) {
      if (
        errors.value.eventName ||
        errors.value.eventColor ||
        errors.value.eventStartDate ||
        errors.value.eventEndDate
      ) {
        return;
      } else {
        // Edit
        if (props.eventName) {
        }
        // Create
        else {
          await onSubmit();
          submitEvent.value = true;
          alert('YEEEEEEEEEAH!');
        }
      }
    }
  }
);
</script>

<template>
  <div>
    <!-- Event - Data -->
    <div class="flex flex-col gap-4 overflow-visible">
      <VVTextField
        name="eventName"
        type="text"
        label="Nome"
        placeholder="Digite aqui"
        :v-model="isEvent ? values.eventName : ''"
        :disabled="isEvent"
      />
      <VVAutocompleteAPIAmbiente
        name="eventEnvironment"
        type="text"
        label="Ambientes"
        placeholder="Digite aqui"
      />
      <VVTextField name="eventColor" type="color" label="Cor" />

      <div class="flex gap-4">
        <VVTextField name="eventStartDate" type="date" label="Início" />
        <VVTextField
          name="eventStartHour"
          type="hour"
          label="Horario de início"
        />
      </div>

      <div class="flex gap-4">
        <VVTextField name="eventEndDate" type="date" label="Término" />
        <VVTextField
          name="eventEndHour"
          type="hour"
          label="Horario de Término"
        />
      </div>
    </div>
  </div>
</template>
