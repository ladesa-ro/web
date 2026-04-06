import type { FormContext } from 'vee-validate';
import { Cargo, type CargoType } from '~/utils/constants';

export type Vinculo = {
  campus: { id: string };
  cargo: CargoType;
};

export type FormUserValues = {
  imagem: Blob | null | undefined;
  nome: string;
  email: string;
  matricula: string;
  vinculos: Array<Vinculo>;
};

export type FormUserOutput = FormUserValues;

export const useFormUser = () => {
  return inject<FormContext<FormUserValues, FormUserOutput>>('FORM_USER')!;
};

export const checkActiveTeacherRole = (vinculo: Vinculo) => {
  return vinculo?.campus?.id && vinculo.cargo === Cargo.PROFESSOR;
};

export const getActivesTeacherRole = (vinculos: Array<Vinculo>) => {
  return vinculos.filter(checkActiveTeacherRole);
};
