<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

type Props = {
  value?: string;
  text?: string;
  successMessage?: string;
};

const props = defineProps<Props>();

const schema = yup.object({
  stepColor: yup.string().required('Cor obrigatória'),
  stepStartDate: yup.string().required('Data de início obrigatória'),
  stepEndDate: yup.string().required('Data de término obrigatória'),
});

const { values, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    stepColor: '#000000',
    stepStartDate: '',
    stepEndDate: '',
  },
});
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
