import type { FormContext } from 'vee-validate';

export type FormUserValues = {
  imagem: Blob | null | undefined;

  nome: string;
  email: string;
  matriculaSiape: string;

  perfis: Array<Perfil>;
};

export type FormUserOutput = {
  imagem: Blob | null | undefined;

  nome: string;
  matriculaSiape: string;
  email: string;

  perfis: Array<Perfil>;
};

export type Perfil = {
  ativo: boolean;
  campus: { id: string };
  cargos: Array<'dape' | 'professor'>;
};

export const useFormUser = () => {
  return inject<FormContext<FormUserValues, FormUserOutput>>('FORM_USER')!;
};

export const checkActiveTeacherRole = (perfil: Perfil) => {
  return (
    perfil?.campus?.id &&
    perfil.campus.id !== null &&
    perfil.cargos.includes('professor')
  );
};

export const checkHasAtLeastOneActiveTeacherRole = (perfis: Array<Perfil>) => {
  return perfis.some(checkActiveTeacherRole);
};

export const getActivesTeacherRole = (perfis: Array<Perfil>) => {
  return perfis.filter(checkActiveTeacherRole);
};
