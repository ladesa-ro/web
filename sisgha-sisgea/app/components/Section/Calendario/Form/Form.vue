<script lang="ts" setup>
// # IMPORT
import IconCalendar from '@/components/Icons/Calendar/IconCalendar.vue';
import IconEvent from '@/components/Icons/IconEvent.vue';
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';
import type { CalendarEvent } from '../Types';

// # CODE
type Props = {
  calendarId?: string;
  editMode?: {
    enable: boolean;
    type: 'calendar' | 'events';
  };
  event?: CalendarEvent;
};

const props = defineProps<Props>();

type FormValues = {
  // Calendar
  calendarName?: string;
  calendarYear?: number;
  trainingOffer?: string;
  campus?: string;
  course?: string;
  // Steps
  calendarSteps?: Array<CalendarEvent>;
};

type FormOutput = FormValues;

// Icons
const cardIcons = [
  { text: 'Calendário', value: 0, icon: IconCalendar },
  { text: 'Evento', value: 1, icon: IconEvent },
];

let modalTitle = ref(props.editMode ? 'Editar' : 'Cadastrar');

// Form steps
const steps = ['Choose', 'Steps', 'Recovery'];

let step = ref(0);

async function formStep(v: string) {
  if (v === 'next') step.value++;
  else if (v === 'prev') step.value--;

  if (step.value === 0)
    modalTitle.value = `${props.editMode ? 'Editar' : 'Cadastrar'}`;
  if (step.value > 1) await setCalendarStepAmount();
}

let registerType = ref<'calendar' | 'events' | null>(null);

function selectRegisterType(type: string | null) {
  if (type) {
    if (type == 'Calendário') registerType.value = 'calendar';
    else if (type == 'Evento') registerType.value = 'events';

    modalTitle.value = `${props.editMode ? 'Editar' : 'Cadastrar'} ${type.toLowerCase()}`;
  }
}

// Calendar - Steps and recovery amount
let calendarStepAmount = ref<number>(0);
let calendarRecoveryAmount = ref<number>(0);

async function setCalendarStepAmount() {
  try {
    if (values.trainingOffer) {
      // Get selected offer and higher offer
      const offerSelected = async (): Promise<string> => {
        try {
          const getTraining =
            await getApiClient().ofertasFormacoes.ofertaFormacaoFindOneById({
              id: values.trainingOffer!,
            }).promise;

          if (getTraining) return getTraining.nome;
          else return '';
        } catch (error) {
          console.error('Erro: ', error);
          return '';
        }
      };

      const higherOffer = async (): Promise<string> => {
        try {
          let searchOffer =
            await getApiClient().ofertasFormacoes.ofertaFormacaoList({
              search: `Superior`,
            }).promise;

          const catchOffer = searchOffer.data?.find(offer =>
            offer.nome.includes('Superior')
          );

          if (catchOffer) return catchOffer.nome;
          else return '';
        } catch (error) {
          console.error('Erro: ', error);
          return '';
        }
      };

      // Check offer
      if ((await offerSelected()) === (await higherOffer())) {
        calendarStepAmount.value = 2;
        calendarRecoveryAmount.value = 1;
      } else {
        calendarStepAmount.value = 4;
        calendarRecoveryAmount.value = 2;
      }
    }
  } catch (error) {
    console.error('Erro: ', error);
  }
}

// Calendar - Steps data
const schemaCalendar = yup.object({
  calendarName: yup.string().required('Nome é obrigatório'),
  calendarYear: yup
    .number()
    .required('Ano letivo é obrigatório')
    .min(2000, 'Ano inválido'),
  trainingOffer: yup.object().shape({
    id: yup.string().required('Formação é obrigatória'),
  }),
  course: yup.object().shape({
    id: yup.string().required('Curso é obrigatório'),
  }),
});

const { handleSubmit, values, errors, setFieldValue } = useForm<FormValues>({
  validationSchema: schemaCalendar,
  initialValues: {
    calendarName: '',
    calendarYear: dayjs().year(),
    trainingOffer: '',
    campus: '',
    course: '',
    // steps: [],
    // recovery: [],
  },
});

function onCancel() {
  // Emit event or reset form
}
const onSubmit = handleSubmit((data: FormOutput) => {
  // Call API here
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <DialogModalBaseLayout :on-close="onCancel" :title="modalTitle">
      <!-- Choose Register -->
      <div v-show="step === 0" class="flex flex-row gap-4">
        <SectionCalendarioUICardOption
          class="w-full"
          v-for="(icon, index) in cardIcons"
          :key="index"
          :icon="icon.icon"
          :text="icon.text"
          @click="(selectRegisterType(icon.text), formStep('next'))"
        />
      </div>

      <!-- Event - Data -->
      <div
        v-show="step === 1 && registerType === 'events' || props.editMode?.type === 'events' && props.editMode?.enable === true"
        class="flex flex-col gap-4 overflow-visible"
      >
        <VVTextField
          name="eventName"
          type="text"
          label="Nome"
          placeholder="Digite aqui"
        />
        <VVAutocompleteAPIAmbiente
          name="eventEnvironment"
          type="text"
          label="Ambientes"
          placeholder="Digite aqui"
        />
        <VVTextField name="stepColor" type="color" label="Cor" />

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

      <!-- Calendar - Data -->
      <div
        v-show="step === 1 && registerType === 'calendar' || props.editMode?.type === 'calendar' && props.editMode?.enable === true"
        class="flex flex-col gap-4 overflow-visible"
      >
        <VVTextField
          name="calendarName"
          type="text"
          label="Nome"
          placeholder="Digite aqui"
        />
        <VVTextField
          name="calendarYear"
          type="number"
          label="Ano Letivo"
          placeholder="Digite aqui"
        />
        <VVAutocompleteAPIOfertaFormacao
          name="trainingOffer"
          label="Formação"
        />
        <VVAutocompleteAPICurso name="course" label="Curso" />
      </div>

      <!-- Calendar - Steps -->
      <div
        v-show="step === 2 && registerType === 'calendar'"
        class="flex flex-col gap-4 pr-2"
      >
        <VVCalendarStep
          v-for="(calendarStep, index) in calendarStepAmount"
          :key="index"
          :text="`Etapa ${index + 1}`"
        />
      </div>

      <!-- Calendar - Recovery -->
      <div
        v-show="step === 3 && registerType === 'calendar'"
        class="flex flex-col gap-4 pr-2"
      >
        <VVCalendarStep
          v-for="(calendarRecovery, index) in calendarRecoveryAmount"
          :key="index"
          :text="`Recuperação ${index + 1}`"
        />
        <VVCalendarStep :text="`Exame`" />
      </div>

      <!-- Buttons -->
      <template #button-group>
        <UIButtonModalGoBack
          v-show="step > 0 || !props.editMode?.type && props.editMode?.enable === false"
          @click.prevent="formStep('prev')"
          text="Voltar"
          class="flex w-full"
        />
        <UIButtonModalCancel @click="onCancel" class="flex w-full" />
        <UIButtonModalAdvance
          v-if="step < steps.length && step > 0 && registerType !== 'events'"
          @click.prevent="formStep('next')"
          text="Avançar"
          class="flex w-full"
        />
        <UIButtonModalSave
          v-else-if="
            (step > steps.length - 1 && step > 0) ||
            (step > 0 && registerType === 'events')
          "
          type="submit"
        />
      </template>
    </DialogModalBaseLayout>
  </form>
</template>
