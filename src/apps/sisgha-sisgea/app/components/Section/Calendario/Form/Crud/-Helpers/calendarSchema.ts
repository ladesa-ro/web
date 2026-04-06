import dayjs from 'dayjs';
import * as yup from 'yup';

export const calendarSchema = yup.object({
  calendarName: yup.string().required('Nome inválido').default(''),
  calendarYear: yup
    .number()
    .required('Ano letivo inválido')
    .min(2000, 'Ano inválido')
    .max(2125, 'Ano inválido')
    .default(() => dayjs().year()),
  campus: yup.string().required('Campus inválido').default(''),
  trainingOffer: yup.string().required('Formação inválida').default(''),
});

export type ICalendarFormValues = yup.InferType<typeof calendarSchema>;
