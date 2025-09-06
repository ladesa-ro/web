<script lang="ts" setup>
// # IMPORT
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type { CalendarEvent } from '../../Types';

// # CODE
type Props = {
  calendarId?: string;
  formStage: number;
  submit?: boolean;
};

const props = defineProps<Props>();
let _formStage = ref<number>(0);

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

          const catchOffer = searchOffer.data?.find((offer: any) =>
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
    .min(2000, 'Ano inválido')
    .max(2125, 'Ano inválido'),
  trainingOffer: yup.string().required('Formação é obrigatória'),
  course: yup.string().required('Curso é obrigatório'),
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

await watch(
  () => props.formStage,
  async (n, o) => {
    _formStage.value = n;
    if (_formStage.value > 1) await setCalendarStepAmount();
  }
);

</script>

<template>
  <div>
    <!-- Calendar - Data -->
    <div v-show="_formStage === 1" class="flex flex-col gap-4 overflow-visible">
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
      <VVAutocompleteAPIOfertaFormacao name="trainingOffer" label="Formação" />
      <VVAutocompleteAPICurso name="course" label="Curso" />
    </div>

    <!-- Calendar - Steps -->
    <div v-show="_formStage === 2" class="flex flex-col gap-4 pr-2">
      <VVCalendarStep
        v-for="(calendarStep, index) in calendarStepAmount"
        :key="index"
        :text="`Etapa ${index + 1}`"
        :calendar-id="props.calendarId!"
      />
    </div>

    <!-- Calendar - Recovery -->
    <div v-show="_formStage === 3" class="flex flex-col gap-4 pr-2">
      <VVCalendarStep
        v-for="(calendarRecovery, index) in calendarRecoveryAmount"
        :key="index"
        :text="`Recuperação ${index + 1}`"
        :calendar-id="props.calendarId!"
      />
      <VVCalendarStep :text="`Exame`" :calendar-id="props.calendarId!" />
    </div>
  </div>
</template>
