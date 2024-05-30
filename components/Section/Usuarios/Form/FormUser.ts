import type { FormContext } from 'vee-validate';

export type FormUserValues = {
	imagem: Blob | null | undefined;

	nome: string;
	email: string;

	vinculos: Array<Vinculo>;
};

export type FormUserOutput = {
	imagem: Blob | null | undefined;
	nome: string;
	codigo: string;
};

export type Vinculo = {
	campus: { id: string };
	cargos: Array<'dape' | 'professor'>;
};

export const useFormUser = () => {
	return inject<FormContext<FormUserValues, FormUserOutput>>('FORM_USER')!;
};
