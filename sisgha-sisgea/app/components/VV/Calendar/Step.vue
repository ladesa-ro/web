<script lang="ts" setup>
import dayjs from 'dayjs';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

type Props = {
  value?: string;
  text: string;
  calendarId: string;
  successMessage?: string;
  submit?: boolean;
};

const props = defineProps<Props>();

const schema = yup.object({
  stepColor: yup.string().required('Cor inválida'),
  stepStartDate: yup.string().required('Data de início inválida'),
  stepEndDate: yup.string().required('Data de término inválida'),
});

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    stepColor: '#000000',
    stepStartDate: '',
    stepEndDate: '',
  },
});

let submitStep = ref<boolean>(false);

defineExpose({
  submitStep,
});

await watch(
  () => props.submit,
  async n => {
    if (n) {
      if (
        errors.value.stepColor ||
        errors.value.stepStartDate ||
        errors.value.stepEndDate
      ) {
        return;
      } else {
        await handleSubmit(async values => {
          if (
            props.text.includes('Recuperação') ||
            props.text.includes('Exame')
          ) {
            await getApiClient().eventos.eventoCreate({
              requestBody: {
                nome: props.text,
                rrule: "",
                cor: values.stepColor,
                calendario: { id: props.calendarId },
                data_inicio: String(
                  dayjs(values.stepStartDate).format('YYYY-MM-DD')
                ),
                data_fim: String(
                  dayjs(values.stepEndDate).format('YYYY-MM-DD')
                ),
              },
            }).promise;
          } else {
            await getApiClient().etapas.etapaCreate({
              requestBody: {
                numero: Number(props.text!.replace(/\D/g, '')),
                cor: values.stepColor,
                calendario: { id: props.calendarId },
                dataInicio: String(
                  dayjs(values.stepStartDate).format('YYYY-MM-DD')
                ),
                dataTermino: String(
                  dayjs(values.stepEndDate).format('YYYY-MM-DD')
                ),
              },
            }).promise;
          }
        }, console.error);

        submitStep.value = true;
        alert('post step' + Number(props.text!.replace(/\D/g, '')));
      }
    }
  }
);
</script>

<template>
  <div class="card flex flex-col w-full p-4 gap-4 overflow-visible">
    <label for="stepColor" class="flex w-full items-center gap-2">
      <div
        class="w-3 h-3 rounded-full bg-ldsa-green-1"
        :style="{ backgroundColor: values.stepColor! }"
      ></div>
      <p class="font-bold whitespace-nowrap">{{ props.text }}</p>
    </label>

    <VVTextField name="stepColor" type="color" label="Cor" />
    <div class="flex gap-4">
      <VVTextField name="stepStartDate" type="date" label="Início" />
      <VVTextField name="stepEndDate" type="date" label="Término" />
    </div>

    <div v-if="Object.keys(errors).length" class="text-ldsa-red text-xs mt-2">
      <div v-for="(msg, key) in errors" :key="key">{{ msg }}</div>
    </div>
  </div>
</template>

<style scoped>
@import '@/components/UI/Card/Card.css';
</style>
