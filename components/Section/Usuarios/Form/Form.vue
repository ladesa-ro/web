<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import type { FormUserOutput, FormUserValues } from './FormUserUtils';

const initialFormValues = reactive({
  imagem: null,
  nome: '',
  codigo: '',
  vinculos: [{ campus: { id: null }, cargos: [] }] as any,
});

const schema = yup.object().shape({
  imagem: yup.mixed().nullable().optional(),

  nome: yup.string().required('Nome é obrigatório!'),

  email: yup
    .string()
    .required('Email é obrigatório!')
    .email('Informe um e-mail válido!'),

  vinculos: yup.array().of(
    yup.object({
      campus: yup.object({
        id: yup.string().required('Informe o campus deste vínculo!'),
      }),
      cargos: yup
        .array()
        .of(yup.string())
        .min(1, 'O usuário deve possuir ao menos 1 cargo neste vínculo!'),
    })
  ),
});

const form = useForm<FormUserValues, FormUserOutput>({
  validationSchema: schema,
  initialValues: initialFormValues,
});

provide('FORM_USER', form);
</script>

<template>
  <slot></slot>
</template>
