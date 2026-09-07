<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

type Props = {
  text: string;
  ofertaFormacaoPeriodoEtapaId: string;
  etapaNome?: string;
  etapaCor?: string;
  dataInicio?: string;
  dataTermino?: string;
};

const props = defineProps<Props>();

const schema = yup.object({
  stepColor: yup.string().required('Cor inválida'),
  stepStartDate: yup.string().required('Data de início inválida'),
  stepEndDate: yup
    .string()
    .required('Data de término inválida')
    .test(
      'after-start',
      'Data de término deve ser igual ou posterior à data de início',
      function (value) {
        const start = this.parent.stepStartDate;
        if (!start || !value) return true;
        return value >= start;
      }
    ),
});

const { values, validate, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    stepColor: props.etapaCor ?? '#000000',
    stepStartDate: props.dataInicio ?? '',
    stepEndDate: props.dataTermino ?? '',
  },
});

// Reagir a props assíncronas (edição: dados carregam depois do mount)
watch(
  () => [props.dataInicio, props.dataTermino, props.etapaCor],
  ([inicio, termino, cor]) => {
    if (inicio || termino || cor) {
      setValues(
        {
          stepStartDate: inicio ?? values.stepStartDate ?? '',
          stepEndDate: termino ?? values.stepEndDate ?? '',
          stepColor: cor ?? values.stepColor ?? '#000000',
        },
        false
      );
    }
  }
);

const getValues = () => ({
  ofertaFormacaoPeriodoEtapaId: props.ofertaFormacaoPeriodoEtapaId,
  dataInicio: values.stepStartDate ?? '',
  dataTermino: values.stepEndDate ?? '',
});

const validateStep = async (): Promise<boolean> => {
  const { valid } = await validate();
  return valid;
};

defineExpose({ getValues, validateStep });
</script>

<template>
  <div class="card step-card u-flex u-flex-col u-w-full u-p-4 u-gap-4">
    <label for="stepColor" class="u-flex u-w-full u-items-center u-gap-2">
      <div
        class="step-color-dot u-rounded-full"
        :style="{ backgroundColor: values.stepColor ?? '#000000' }"
      />
      <p class="step-label u-font-bold">{{ props.text }}</p>
    </label>

    <VVTextField name="stepColor" type="color" label="Cor" />
    <div class="u-flex u-gap-4">
      <VVDateField name="stepStartDate" label="Início" />
      <VVDateField name="stepEndDate" label="Término" />
    </div>
  </div>
</template>

<style scoped>
@import '@/components/UI/Card/Card.css';

.step-card {
  overflow: visible;
}

.step-color-dot {
  width: 0.75rem;
  height: 0.75rem;
  background-color: var(--ladesa-green-1-color);
}

.step-label {
  white-space: nowrap;
}
</style>
