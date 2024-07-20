import { useForm } from 'vee-validate';
import type { TurmaFormOutput, TurmaFormValues } from './typings';

export const useTurmaForm = () => {
  return useForm<TurmaFormValues, TurmaFormOutput>();
};
