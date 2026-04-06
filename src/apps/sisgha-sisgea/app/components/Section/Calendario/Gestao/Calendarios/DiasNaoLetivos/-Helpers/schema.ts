import * as yup from 'yup';

export const diaEditSchema = yup.object({
  feriado: yup.string().nullable().default('' as string),
  cor: yup.string().nullable().default(null),
  diaLetivo: yup.boolean().required().default(false as boolean),
  diaPresencial: yup.boolean().required().default(false as boolean),
  extraCurricular: yup.boolean().required().default(false as boolean),
});

export type IDiaEditFormValues = yup.InferType<typeof diaEditSchema>;
