<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { calendarDataMethods } from '~/components/Section/Calendario/CalendarDataMethods';

type Props = {
  isStep: boolean;
  text: string;
  calendarId: string;
  successMessage?: string;
  submit?: boolean;
};

const props = defineProps<Props>();
const _calendarId = toRef(props, 'calendarId');

const schema = yup.object({
  stepColor: yup.string().required('Cor inválida'),
  stepStartDate: yup.string().required('Data de início inválida'),
  stepEndDate: yup.string().required('Data de término inválida'),
});

const { values, validate } = useForm({
  validationSchema: schema,
  initialValues: {
    stepColor: '#000000',
    stepStartDate: '',
    stepEndDate: '',
  },
});

const submitted = ref<boolean>(false);

async function onSubmit() {
  if (submitted.value === false) {
    if (props.isStep) {
      // TODO: individual etapa CRUD was removed from the API.
      // Etapas are now managed via bulk replace (calendarioLetivoEtapaBulkReplace).
      // This needs a UI redesign to provide ofertaFormacaoPeriodoEtapaId.
      console.warn(
        'postStep: individual etapa CRUD is no longer available — use bulkReplaceSteps'
      );
    } else {
      await calendarDataMethods.events.postEvent(
        props.text,
        values.stepColor,
        {
          date: values.stepStartDate,
        },
        {
          date: values.stepEndDate,
        },
        _calendarId.value
      );
    }

    submitted.value = true;
  }
}

const validateStepCrud = async (): Promise<boolean> => {
  const { valid } = await validate();
  if (!valid) return false;
  else {
    await onSubmit();
    return true;
  }
};

defineExpose({ validateStepCrud });
</script>

<template>
  <div class="card flex flex-col w-full p-4 gap-4 overflow-visible">
    <label for="stepColor" class="flex w-full items-center gap-2">
      <div
        class="w-3 h-3 rounded-full bg-ldsa-green-1"
        :style="{ backgroundColor: values.stepColor! }"
      />
      <p class="font-bold whitespace-nowrap">{{ props.text }}</p>
    </label>

    <VVTextField name="stepColor" type="color" label="Cor" />
    <div class="flex gap-4">
      <VVTextField name="stepStartDate" type="date" label="Início" />
      <VVTextField name="stepEndDate" type="date" label="Término" />
    </div>
  </div>
</template>

<style scoped>
@import '@/components/UI/Card/Card.css';
</style>
