import { useFormValues } from 'vee-validate';
import type { TurmaFormValues } from './typings';

export const useTurmaFormValues = () => {
  return useFormValues<TurmaFormValues>();
};
