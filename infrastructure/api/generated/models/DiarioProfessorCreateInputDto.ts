/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectUuidInputDto } from './ObjectUuidInputDto';
export type DiarioProfessorCreateInputDto = {
	/**
	 * Situação do vínculo.
	 */
	situacao: string;
	/**
	 * Diário vinculado.
	 */
	diario: ObjectUuidInputDto;
	/**
	 * Vínculo do usuário ao campus.
	 */
	vinculo: ObjectUuidInputDto;
};
