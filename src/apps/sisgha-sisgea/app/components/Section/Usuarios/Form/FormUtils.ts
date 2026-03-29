import type { FormContext } from 'vee-validate';

export const Cargo = {
  DAPE: 'dape',
  PROFESSOR: 'professor',
} as const;

export type CargoType = (typeof Cargo)[keyof typeof Cargo];

export const CargoLabels: Record<CargoType, string> = {
  [Cargo.DAPE]: 'DAPE',
  [Cargo.PROFESSOR]: 'Professor',
};

export const CargoOptions = Object.values(Cargo).map(value => ({
  value,
  label: CargoLabels[value],
}));

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
