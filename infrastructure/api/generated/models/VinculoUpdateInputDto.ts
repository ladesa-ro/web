/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type VinculoUpdateInputDto = {
	/**
	 * Campus do vínculo.
	 */
	campus: ObjectUuidInputDto;
	/**
	 * Usuário do vínculo.
	 */
	usuario: ObjectUuidInputDto;
	/**
	 * Cargos do vínculo.
	 */
	cargos: Array<string>;
};
