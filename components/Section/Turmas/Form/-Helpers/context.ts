import { useForm } from 'vee-validate';
import type { TurmaFormOutput, TurmaFormValues } from './typings';

export const useTurmasFormVVContext = () => {
  return useForm<TurmaFormValues, TurmaFormOutput>();
};
