<script lang="ts" setup>
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type Step from '~/components/VV/Calendar/Step.vue';
import { useCampusUsuarioId } from '~/composables/integrations/ladesa-api/modules/useCampusUsuarioId';
import { calendarDataMethods } from '../../CalendarDataMethods';

type Props = {
  calendarId?: string;
  formStage: number;
};

const props = defineProps<Props>();
let _formStage = ref<number>(0);

type FormValues = {
  calendarName?: string;
  calendarYear?: number;
  trainingOffer?: string;
  campus?: string;
};

let calendarStepAmount = ref<number>(0);
let calendarRecoveryAmount = ref<number>(0);
const stepRefs = ref<InstanceType<typeof Step>[]>([]);

async function setCalendarStepAmount() {
  try {
    if (values.trainingOffer) {
      const offerSelected = async (): Promise<string> => {
        try {
          const getTraining =
            await getApiClient().ofertasFormacoes.ofertaFormacaoFindById({
              id: values.trainingOffer!,
            });
          if (getTraining) return getTraining.nome;
          return '';
        } catch {
          return '';
        }
      };

      const higherOffer = async (): Promise<string> => {
        try {
          const searchOffer =
            await getApiClient().ofertasFormacoes.ofertaFormacaoFindAll({
              search: `Superior`,
            });
          const catchOffer = searchOffer.data?.find((offer: any) =>
            offer.nome.includes('Superior')
          );
          if (catchOffer) return catchOffer.nome;
          return '';
        } catch {
          return '';
        }
      };

      if ((await offerSelected()) === (await higherOffer())) {
        calendarStepAmount.value = 2;
        calendarRecoveryAmount.value = 1;
      } else {
        calendarStepAmount.value = 4;
        calendarRecoveryAmount.value = 2;
      }
    }
  } catch {}
}

const createdCalendarId = ref<string>('');

const schemaCalendar = yup.object({
  calendarName: yup.string().required('Nome inválido'),
  calendarYear: yup
    .number()
    .required('Ano letivo inválido')
    .min(2000, 'Ano inválido')
    .max(2125, 'Ano inválido'),
  campus: yup.string().required('Campus inválido'),
  trainingOffer: yup.string().required('Formação inválida'),
});

const { values, validate, setFieldValue } = useForm<FormValues>({
  validationSchema: schemaCalendar,
  initialValues: {
    calendarName: '',
    calendarYear: dayjs().year(),
    trainingOffer: '',
    campus: '',
  },
});

const campusUsuarioDefault = await useCampusUsuarioId();

watch(
  () => values.campus,
  () => {
    setFieldValue('trainingOffer', '');
  }
);

async function onSubmit(): Promise<string> {
  await calendarDataMethods.calendar.postCalendar(
    values.calendarName!,
    values.calendarYear!,
    values.campus!,
    values.trainingOffer!
  );

  return calendarDataMethods.calendar.getCalendarIdByData(
    values.calendarName!,
    values.calendarYear!,
    values.campus!,
    values.trainingOffer!
  );
}

let formValidation = async (): Promise<boolean> => {
  const { valid } = await validate();
  if (!valid) return false;
  return true;
};

const validCalendarCrud = async (): Promise<boolean> => {
  if (await formValidation()) {
    createdCalendarId.value = await onSubmit();

    for (const ref of stepRefs.value) {
      if (ref) await ref.validateStepCrud();
    }

    return true;
  }
  return false;
};

defineExpose({ validCalendarCrud, formValidation });

watch(
  () => props.formStage,
  async n => {
    _formStage.value = n;
    if (_formStage.value > 1) await setCalendarStepAmount();
  }
);
</script>

<template>
  <div>
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

      <VVAutocompleteAPICampus name="campus" label="Campus" />

      <VVAutocompleteAPIOfertaFormacao
        name="trainingOffer"
        label="Formação"
        :disabled="!values.campus"
        :campus-id="values.campus"
      />
    </div>

    <div v-show="_formStage === 2" class="flex flex-col gap-4 pr-2">
      <VVCalendarStep
        v-for="(calendarStep, index) in calendarStepAmount"
        :key="index"
        :text="`Etapa ${index + 1}`"
        :calendar-id="createdCalendarId!"
        :is-step="true"
        ref="stepRefs"
      />
    </div>

    <div v-show="_formStage === 3" class="flex flex-col gap-4 pr-2">
      <VVCalendarStep
        v-for="(calendarRecovery, index) in calendarRecoveryAmount"
        :key="index"
        :text="`Recuperação ${index + 1}`"
        :calendar-id="createdCalendarId!"
        :is-step="false"
      />
      <VVCalendarStep
        :text="`Exame`"
        :calendar-id="props.calendarId! || ''"
        :is-step="false"
      />
    </div>
  </div>
</template>
