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
  stepEndDate: yup.string().required('Data de término inválida'),
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
  () => [props.dataInicio, props.dataTermino],
  ([inicio, termino]) => {
    if (inicio || termino) {
      setValues({
        stepStartDate: inicio ?? '',
        stepEndDate: termino ?? '',
      }, false);
    }
  },
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
  <div class="card flex flex-col w-full p-4 gap-4 overflow-visible">
    <label for="stepColor" class="flex w-full items-center gap-2">
      <div
        class="w-3 h-3 rounded-full bg-ldsa-green-1"
        :style="{ backgroundColor: values.stepColor ?? '#000000' }"
      />
      <p class="font-bold whitespace-nowrap">{{ props.text }}</p>
    </label>

    <VVTextField
      v-if="!dataInicio && !dataTermino"
      name="stepColor"
      type="color"
      label="Cor"
    />
    <div class="flex gap-4">
      <VVDateField name="stepStartDate" label="Início" />
      <VVDateField name="stepEndDate" label="Término" />
    </div>
  </div>
</template>

<style scoped>
@import '@/components/UI/Card/Card.css';
</style>
