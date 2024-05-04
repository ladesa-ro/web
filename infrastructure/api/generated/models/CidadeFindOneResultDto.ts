/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoDto } from './EstadoDto';
export type CidadeFindOneResultDto = {
	/**
	 * ID IBGE da Cidade.
	 */
	id: number;
	/**
	 * Nome oficial da Cidade.
	 */
	nome: string;
	/**
	 * Estado da Cidade.
	 */
	estado: EstadoDto;
};
