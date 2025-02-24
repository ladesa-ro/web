import type { FormContext } from 'vee-validate';

export type FormUserValues = {
  imagem: Blob | null | undefined;

  nome: string;
  email: string;
  matriculaSiape: string;

  vinculos: Array<Vinculo>;
};

export type FormUserOutput = {
  imagem: Blob | null | undefined;

  nome: string;
  matriculaSiape: string;
  email: string;

  vinculos: Array<Vinculo>;
};

export type Vinculo = {
  ativo: boolean;
  campus: { id: string };
  cargos: Array<'dape' | 'professor'>;
};

export const useFormUser = () => {
  return inject<FormContext<FormUserValues, FormUserOutput>>('FORM_USER')!;
};

export const checkActiveTeacherRole = (vinculo: Vinculo) => {
  return (
    vinculo?.campus?.id &&
    vinculo.campus.id !== null &&
    vinculo.cargos.includes('professor')
  );
};

export const checkHasAtLeastOneActiveTeacherRole = (
  vinculos: Array<Vinculo>
) => {
  return vinculos.some(checkActiveTeacherRole);
};

export const getActivesTeacherRole = (vinculos: Array<Vinculo>) => {
  return vinculos.filter(checkActiveTeacherRole);
};
